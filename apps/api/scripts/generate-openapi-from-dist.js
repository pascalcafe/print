// generate-openapi-from-dist.js
// Requires the compiled dist files. Run `pnpm --filter @easyprint/api build` before executing.
const fs = require('fs');
const yaml = require('js-yaml');

// ensure Reflect metadata is available for Nest/swagger
try { require('reflect-metadata'); } catch (e) {}

// Prevent Prisma from connecting
try {
  const { PrismaClient } = require('@prisma/client');
  if (PrismaClient && PrismaClient.prototype) {
    PrismaClient.prototype.$connect = async () => {};
    PrismaClient.prototype.$on = () => {};
  }
} catch (err) {
  // ignore
}

async function generate() {
  // require Nest factories from compiled code
  const { NestFactory } = require('@nestjs/core');
  const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

  // Resolve dist paths reliably relative to repo root and this script
  const path = require('path');
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const pkgCwd = process.cwd();
  const candidates = [
    path.join(repoRoot, 'dist', 'apps', 'api', 'src', 'modules', 'app.module.js'),
    path.join(repoRoot, 'dist', 'apps', 'api', 'apps', 'api', 'src', 'modules', 'app.module.js'),
    path.join(pkgCwd, 'dist', 'apps', 'api', 'src', 'modules', 'app.module.js'),
    path.join(pkgCwd, 'dist', 'apps', 'api', 'apps', 'api', 'src', 'modules', 'app.module.js')
  ];

  let appModule = null;
  for (const c of candidates) {
    try {
      if (require('fs').existsSync(c)) {
        appModule = require(c);
        break;
      }
    } catch (err) {
      // continue
    }
  }
  if (!appModule) {
    throw new Error('Could not locate compiled AppModule in dist. Checked: ' + candidates.join(', '));
  }
  const AppModule = appModule.AppModule || appModule.default;

  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('EasyPrint API')
    .setDescription('Auto-generated OpenAPI specification')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
    .build();

  // Some @nestjs/swagger versions expect different internals for Nest's
  // container modules (routes vs _controllers). Create a compatibility shim
  // that adapts the container shape to what the SwaggerScanner expects and
  // use the internal SwaggerScanner directly.
  const { SwaggerScanner } = require('@nestjs/swagger/dist/swagger-scanner');
  const { assignTwoLevelsDeep } = require('@nestjs/swagger/dist/utils/assign-two-levels-deep');

  const container = app.container;
  const modulesMap = container.getModules();
  // first pass: create adapted entries for each module
  const adapted = new Map();
  for (const [key, mod] of modulesMap.entries()) {
    adapted.set(key, {
      metatype: mod._metatype || mod.metatype,
      routes: mod.routes || mod._controllers || new Map(),
      relatedModules: new Map(),
    });
  }
  // second pass: populate relatedModules using adapted references
  for (const [key, mod] of modulesMap.entries()) {
    const target = adapted.get(key);
    const imports = mod.relatedModules || mod._imports || new Map();
    for (const [impKey, impVal] of imports.entries()) {
      if (adapted.has(impKey)) {
        target.relatedModules.set(impKey, adapted.get(impKey));
      }
      else {
        target.relatedModules.set(impKey, {
          metatype: impVal._metatype || impVal.metatype,
          routes: impVal.routes || impVal._controllers || new Map(),
          relatedModules: new Map(),
        });
      }
    }
  }

  console.log('adapted modules count:', adapted.size);
  const sampleAdapted = [...adapted.values()].slice(0, 5).map(m => ({ metatype: m.metatype && m.metatype.name, routesSize: m.routes && m.routes.size }));
  console.log('sample adapted:', sampleAdapted);

  const appShim = Object.create(app);
  appShim.container = { getModules: () => adapted };

  const scanner = new SwaggerScanner();

  // Build document by scanning each module's own routes (avoid deep scan complexities)
  const modulesToScan = scanner.getModules(adapted, [AppModule]);
  const denormalizedPaths = [];
  for (const m of modulesToScan) {
    try {
      const res = scanner.scanModuleRoutes(m.routes, /* modulePath */ '', /* globalPrefix */ '', app.config);
      denormalizedPaths.push(...res);
    } catch (e) {
      // continue on error for individual modules
      console.warn('warning scanning module', m.metatype && m.metatype.name, e && e.message);
    }
  }

  const schemas = scanner.explorer.getSchemas();
  // apply extra models if any
  if (config.components && config.components.schemas) {
    Object.assign(schemas, config.components.schemas);
  }

  const finalDoc = Object.assign({ openapi: '3.0.0', paths: {} }, config, {
    paths: {},
    components: { schemas }
  });
  // normalize paths using transformer's helper
  const flattened = denormalizedPaths.flat();
  finalDoc.paths = scanner.transformer.normalizePaths(flattened);

  const yamlStr = yaml.dump(finalDoc);
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/openapi.yaml', yamlStr, { encoding: 'utf8' });
  console.log('OpenAPI written to docs/openapi.yaml');

  await app.close();
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});

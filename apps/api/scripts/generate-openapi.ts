import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Prevent Prisma from attempting to connect when generating OpenAPI
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client');
  if (PrismaClient && PrismaClient.prototype) {
    PrismaClient.prototype.$connect = async () => {};
    PrismaClient.prototype.$on = () => {};
  }
} catch (err) {
  // ignore if prisma client not available at generation time
}
async function generate() {
  // Ensure environment variables (DB, etc.) are set when running this script.
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('EasyPrint API')
    .setDescription('Auto-generated OpenAPI specification')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config, { include: [AppModule] });
  const yamlStr = yaml.dump(document);

  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/openapi.yaml', yamlStr, { encoding: 'utf8' });
  console.log('OpenAPI written to docs/openapi.yaml');

  await app.close();
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});

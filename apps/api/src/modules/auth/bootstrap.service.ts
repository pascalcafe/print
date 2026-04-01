import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  permissionCatalog,
  permissionsByRole,
  roleCatalog,
  type UserRoleKey
} from "@easyprint/shared";
import { hash } from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthBootstrapService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const defaultTenant = await this.prisma.tenant.upsert({
      where: { slug: "default" },
      update: {},
      create: {
        name: "Default Tenant",
        slug: "default",
        settings: {
          create: {
            defaultUnit: "mm",
            defaultDpi: 203,
            allowDraftPrinting: true
          }
        }
      }
    });

    const permissionIds = new Map<string, string>();
    for (const [key, name] of Object.entries(permissionCatalog)) {
      const permission = await this.prisma.permission.upsert({
        where: { key },
        update: {},
        create: { key, name }
      });
      permissionIds.set(key, permission.id);
    }

    const roleIds = new Map<UserRoleKey, string>();
    for (const [roleKey, roleName] of Object.entries(roleCatalog) as [
      UserRoleKey,
      string
    ][]) {
      const role = await this.prisma.role.upsert({
        where: { key: roleKey },
        update: { name: roleName },
        create: {
          key: roleKey,
          name: roleName
        }
      });

      roleIds.set(roleKey, role.id);

      await this.prisma.rolePermission.deleteMany({
        where: { roleId: role.id }
      });

      await this.prisma.rolePermission.createMany({
        data: permissionsByRole[roleKey].map((permissionKey) => ({
          roleId: role.id,
          permissionId: permissionIds.get(permissionKey)!
        }))
      });
    }

    const adminPasswordHash = await hash("EasyPrint123!", 10);
    const adminUser = await this.prisma.user.upsert({
      where: { email: "admin@easyprint.local" },
      update: {},
      create: {
        email: "admin@easyprint.local",
        name: "EasyPrint Admin",
        passwordHash: adminPasswordHash
      }
    });

    await this.prisma.userTenant.upsert({
      where: {
        userId_tenantId: {
          userId: adminUser.id,
          tenantId: defaultTenant.id
        }
      },
      update: {
        roleId: roleIds.get("admin")!
      },
      create: {
        userId: adminUser.id,
        tenantId: defaultTenant.id,
        roleId: roleIds.get("admin")!
      }
    });
  }
}

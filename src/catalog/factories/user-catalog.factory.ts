import { Injectable } from "@nestjs/common";
import { ICatalogFactory } from "@src/catalog/factories/catalog-factory.interfaces";
import { UserCatalogResolver } from '@src/catalog/user-catalog/user-catalog.resolver'
import { UserCatalogService } from "@src/catalog/user-catalog/user-catalog.service";
import { PrismaService } from "@src/infrastructure/prisma/prisma.service";

@Injectable()
export class UserCatalogFactory implements ICatalogFactory<UserCatalogService, UserCatalogResolver> {
  constructor(private readonly prisma: PrismaService) {}

  public createService() {
    return new UserCatalogService(this.prisma)
  }

  public createResolver(service) {
    return new UserCatalogResolver(service);
  }
}
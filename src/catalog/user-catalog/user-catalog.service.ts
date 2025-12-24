import { Injectable } from '@nestjs/common';
import { ICatalogService } from "@src/catalog/factories/catalog-factory.interfaces";
import { CreateItemInput } from "@src/catalog/user-catalog/inputs/create-item.input";
import { userCatalogItemFieldsUtil } from "@src/catalog/user-catalog/utils/user-catalog-item-fields.util";
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class UserCatalogService implements ICatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(id: string): Promise<UserCatalogItem[]> {
    return this.prisma.item.findMany({
      where: { userId: id },
      select: userCatalogItemFieldsUtil
    })
  }

  async create(input: CreateItemInput, userId: string): Promise<UserCatalogItem> {
    const { name, image, description } = input;
    return this.prisma.item.create({
      data: {
        name,
        image,
        description: description ?? null,
        user: {
          connect: {
            id: userId
          }
        }
      },
      select: userCatalogItemFieldsUtil
    })
  }
}

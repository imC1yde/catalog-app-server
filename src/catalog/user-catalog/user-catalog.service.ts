import { Injectable, NotFoundException } from '@nestjs/common'
import { ICatalogService } from "@src/catalog/factories/catalog-factory.interfaces"
import { CreateItemInput } from "@src/catalog/user-catalog/inputs/create-item.input"
import { userCatalogItemFieldsUtil } from "@src/catalog/user-catalog/utils/user-catalog-item-fields.util"
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"

@Injectable()
export class UserCatalogService implements ICatalogService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async findAllByUserId(id: string): Promise<UserCatalogItem[]> {
    try {
      const items = await this.prisma.item.findMany({
        where: { userId: id },
        select: userCatalogItemFieldsUtil
      })

      return items
    } catch (error) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`)
    }
  }

  public async create(input: CreateItemInput, userId: string): Promise<UserCatalogItem> {
    const { name, image, description } = input;

    try {
      const item = await this.prisma.item.create({
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

      return item
    } catch (error) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`)
    }
  }
}

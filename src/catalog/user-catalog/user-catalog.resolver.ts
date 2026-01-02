import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from '@nestjs/graphql';
import { ICatalogResolver } from "@src/catalog/factories/catalog-factory.interfaces";
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service';
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { IsAuthGuard } from "@src/common/guards/is-auth.guard";
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type";

@Resolver()
export class UserCatalogResolver implements ICatalogResolver {
  constructor(private readonly userCatalogService: UserCatalogService) {}

  @UseGuards(IsAuthGuard)
  @Query(() => [ UserCatalogItem ], { name: 'getUserCatalog' })
  public async getUserCatalog(@CurrentUser() user: IUserPayload): Promise<UserCatalogItem[]> {
    return await this.userCatalogService.findAllByUserId(user.sub) as UserCatalogItem[]
  }
}

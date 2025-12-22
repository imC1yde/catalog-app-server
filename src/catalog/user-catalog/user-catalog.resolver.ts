import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { ICatalogResolver } from "@src/catalog/factories/catalog-factory.interfaces";
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service';
import { IsAuthGuard } from "@src/common/guards/is-auth.guard";
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type";

@Resolver()
export class UserCatalogResolver implements ICatalogResolver {
  constructor(private readonly userCatalogService: UserCatalogService) {
  }

  @UseGuards(IsAuthGuard)
  @Query(() => UserCatalogItem, { name: 'getUserCatalog' })
  async getUserCatalog(@Args('id') id: string, @Context('req') req: any): Promise<UserCatalogItem[]> {
    return await this.userCatalogService.findAllByUserId(req.headers['user']?.id) as UserCatalogItem[]
  }
}

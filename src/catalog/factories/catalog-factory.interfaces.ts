export interface ICatalogService {
}

export interface ICatalogResolver {
}

export interface ICatalogFactory<TService extends ICatalogService = ICatalogService, TResolver extends ICatalogResolver = ICatalogResolver> {
  createService(): TService

  createResolver(catalogService: TService): TResolver
}
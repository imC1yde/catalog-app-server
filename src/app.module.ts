import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { JwtModule } from "@nestjs/jwt"
import { CatalogModule } from '@src/catalog/catalog.module'
import { GlobalConfigifyModule } from '@src/configs/global-configify.module'
import { JwtConfig } from '@src/configs/jwt.config'
import { CoreModule } from '@src/core/core.module'
import { PrismaModule } from '@src/prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    GlobalConfigifyModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ JwtConfig ],
      useFactory: (config: JwtConfig) => ({
        secret: config.jwtSecret
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: false,
      introspection: true,
      context: ({ req }) => ({ req })
    }),
    CoreModule,
    CatalogModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
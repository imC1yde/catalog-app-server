import { type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { AuthModule } from '@src/auth/auth.module';
import Configuration from '@src/configs/configuration'
import { graphqlConfig } from "@src/configs/graphql.config";
import { jwtConfig } from '@src/configs/jwt.config';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [ '.env' ],
      load: [ Configuration ],
      isGlobal: true,
      expandVariables: true
    }),
    JwtModule.register(jwtConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    AuthModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
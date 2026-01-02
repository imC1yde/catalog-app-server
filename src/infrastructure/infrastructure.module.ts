import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@src/infrastructure/config/config.module'
import { PrismaModule } from '@src/infrastructure/prisma/prisma.module'

@Global()
@Module({
  imports: [ ConfigModule, PrismaModule ],
  exports: [ ConfigModule, PrismaModule ]
})
export class InfrastructureModule {}

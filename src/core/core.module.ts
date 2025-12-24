import { Module } from '@nestjs/common';
import { AuthModule } from "@src/core/auth/auth.module";
import { UserModule } from '@src/core/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule
  ]
})
export class CoreModule {}

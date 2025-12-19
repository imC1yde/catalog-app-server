import { Module } from '@nestjs/common';
import { AuthResolver } from '@src/core/auth/auth.resolver';
import { AuthService } from '@src/core/auth/auth.service';
import { UserModule } from "@src/core/user/user.module";

@Module({
  providers: [ AuthResolver, AuthService ],
  imports: [ UserModule ],
})
export class AuthModule {
}

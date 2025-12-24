import { Module } from '@nestjs/common';
import { UserResolver } from '@src/core/user/user.resolver';
import { UserService } from '@src/core/user/user.service';

@Module({
  providers: [ UserResolver, UserService ],
  exports: [ UserService ]
})
export class UserModule {}

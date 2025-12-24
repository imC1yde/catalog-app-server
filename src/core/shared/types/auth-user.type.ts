import { Field } from '@nestjs/graphql'
import { User } from '@src/common/types/user.type'
import type { Nullable } from '@src/common/utils/nullable'

export class AuthUser extends User {
  @Field(() => String, { nullable: true })
  token: Nullable<string>
}
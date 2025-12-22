import { User } from '@src/common/types/user.type'

export class AuthUser extends User {
  @Field(() => String, { nullable: true })
  token: Nullable<string>
}
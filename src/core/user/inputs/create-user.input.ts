import { Field, OmitType, InputType } from '@nestjs/graphql'
import { PASSWORD_SETTINGS } from '@src/common/constants/password-settings.constant'
import { User } from '@src/common/types/user.type'
import { IsStrongPassword } from 'class-validator'

@InputType()
export class CreateUserInput extends OmitType(User, [ 'id', 'profileImage' ]) {
  @IsStrongPassword(PASSWORD_SETTINGS)
  @Field(() => String)
  password: string
}
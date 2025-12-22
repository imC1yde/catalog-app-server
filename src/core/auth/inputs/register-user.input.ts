import { Field, InputType, OmitType } from "@nestjs/graphql";
import { PASSWORD_SETTINGS } from "@src/common/constants/password-settings.constant";
import { User } from '@src/common/types/user.type'
import { IsStrongPassword } from "class-validator";

@InputType()
export class RegisterUserInput extends OmitType(User, [ 'id', 'profileImage' ]) {
  @IsStrongPassword(PASSWORD_SETTINGS)
  @Field(() => String)
  password: string
}
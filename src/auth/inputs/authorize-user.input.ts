import { Field, InputType } from "@nestjs/graphql"
import { PASSWORD_SETTINGS } from "@src/common/constants/password-settings.constant"
import { EMAIL_REGEX } from "@src/common/constants/regex.constants"
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator"

@InputType()
export class AuthorizeUserInput {
  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  @Field(() => String)
  email: string

  @IsStrongPassword(PASSWORD_SETTINGS)
  @IsNotEmpty()
  @Field(() => String)
  password: string
}
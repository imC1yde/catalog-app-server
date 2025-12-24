import { Field, InputType } from "@nestjs/graphql";
import { PASSWORD_SETTINGS } from "@src/common/constants/password-settings.constant";
import { EMAIL_REGEX } from "@src/common/constants/regex.constants";
import { IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";

@InputType()
export class RegisterUserInput {
  @Field(() => String, { nullable: true })
  @Length(1, 32)
  username?: string;

  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  @Field(() => String)
  email: string

  @IsStrongPassword(PASSWORD_SETTINGS)
  @IsNotEmpty()
  @Field(() => String)
  password: string
}
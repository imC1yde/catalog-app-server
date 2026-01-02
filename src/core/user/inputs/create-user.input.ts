import { Field, InputType } from '@nestjs/graphql'
import { PASSWORD_SETTINGS } from '@src/common/constants/password-settings.constant'
import { EMAIL_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable'
import { IsStrongPassword, Matches } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>

  @Field(() => String)
  @Matches(EMAIL_REGEX)
  readonly email: string

  @IsStrongPassword(PASSWORD_SETTINGS)
  @Field(() => String)
  readonly password: string
}
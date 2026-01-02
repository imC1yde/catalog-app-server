import { Field, InputType } from '@nestjs/graphql'
import { IMAGE_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable'
import { Matches } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>

  @Field(() => String, { nullable: true })
  @Matches(IMAGE_REGEX)
  readonly profileImage: Nullable<string>
}
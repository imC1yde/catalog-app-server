import { Field, InputType } from "@nestjs/graphql";
import { IMAGE_REGEX } from "@src/common/constants/regex.constants";
import { IsNotEmpty, Matches } from "class-validator";

@InputType()
export class CreateItemInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @Matches(IMAGE_REGEX)
  @Field(() => String)
  image: string

  @Field(() => String, { nullable: true })
  description: string
}
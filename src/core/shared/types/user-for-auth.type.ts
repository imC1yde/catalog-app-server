import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@src/common/types/user.type'

@ObjectType()
export class UserForAuth extends User {
  @Field(() => String, { nullable: true })
  password: string
}
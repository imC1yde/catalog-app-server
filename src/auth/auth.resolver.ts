import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { AuthorizeUserInput } from "@src/auth/inputs/authorize-user.input";
import type { RegisterUserInput } from "@src/auth/inputs/register-user.input";
import { User } from "@src/common/types/user.type";
import { AuthService } from './auth.service';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => null, { name: "registerUser" })
  async registerUser(@Args("registerUserInput") input: RegisterUserInput) {
    await this.authService.register(input)
  }

  @Query(() => User)
  async authorizeUser(@Args("authorizeUser") input: AuthorizeUserInput) {
    return await this.authService.authorize(input)
  }
}

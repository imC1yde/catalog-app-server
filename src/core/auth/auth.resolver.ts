import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@src/common/types/user.type";
import { AuthService } from '@src/core/auth/auth.service';
import { AuthorizeUserInput } from "@src/core/auth/inputs/authorize-user.input";
import { RegisterUserInput } from "@src/core/auth/inputs/register-user.input";


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean, { name: "registerUser" })
  async registerUser(@Args("registerUserInput", { type: () => RegisterUserInput }) input: RegisterUserInput) {
    return await this.authService.register(input)
  }

  @Query(() => User, { name: "authorizeUser" })
  async authorizeUser(@Args("authorizeUserInput", { type: () => AuthorizeUserInput }) input: AuthorizeUserInput) {
    return await this.authService.authorize(input)
  }
}

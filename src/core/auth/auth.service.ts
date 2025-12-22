import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/common/types/user.type"
import { AuthorizeUserInput } from "@src/core/auth/inputs/authorize-user.input";
import { RegisterUserInput } from "@src/core/auth/inputs/register-user.input";
import { UserService } from "@src/core/user/user.service";
import { PrismaService } from "@src/prisma/prisma.service";
import { compare, genSalt, hash } from "bcrypt";


export type AuthUser = Omit<User, "password" | "email"> & { token: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {
  }

  // check email and password with stored data
  async authenticate(user: User, email: string, password: string): Promise<boolean> {
    return await compare(password, user.password) && user.email === email
  }

  // takes input with optional username, email and password
  async register(input: RegisterUserInput): Promise<User> {
    let salt = await genSalt(10)
    input.password = await hash(password, salt)

    return await this.userService.create(input)
  }

  async authorize(input: AuthorizeUserInput): Promise<AuthUser> {
    const { email, password } = input

    const user = await this.userService.findByEmail(email)
    if (!user) throw new Error("User not found")

    const isAuthentified = await this.authenticate(user, email, password)
    if (!isAuthentified) throw new Error("Authentication failed")

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: email
    })

    return {
      username: user.username,
      profileImage: user.profileImage,
      token: token
    }
  }
}

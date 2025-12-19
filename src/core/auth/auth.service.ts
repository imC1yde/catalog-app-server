import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/common/types/user.type"
import type { AuthorizeUserInput } from "@src/core/auth/inputs/authorize-user.input";
import type { RegisterUserInput } from "@src/core/auth/inputs/register-user.input";
import { UserService } from "@src/core/user/user.service";
import { PrismaService } from "@src/prisma/prisma.service";
import { compare, genSalt, hash } from "bcrypt";


export type AuthUser = Omit<User, "password" | "email"> & { accessToken: string }

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

  // takes input with username?, email and password
  // @returns true if user registered successfully
  async register(input: RegisterUserInput): Promise<boolean> {
    const { username, email, password } = input

    let salt = await genSalt(10)
    const hashed = await hash(password, salt)

    return await this.userService.create({ username, email, password: hashed })
  }

  async authorize(input: AuthorizeUserInput): Promise<AuthUser> {
    const { email, password } = input

    //  identification
    const user = await this.userService.findByEmail(email)

    if (!user) throw new Error("User not found")

    // authentification
    const isAuthentified = await this.authenticate(user, email, password)

    if (!isAuthentified) throw new Error("Authentication failed")

    // authorization
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: email
    })

    return {
      username: user.username,
      profileImage: user.profileImage,
      accessToken: accessToken,
    }
  }
}

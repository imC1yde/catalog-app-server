import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from "@nestjs/jwt"
import { User } from "@src/common/types/user.type"
import { AuthorizeUserInput } from "@src/core/auth/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/core/auth/inputs/register-user.input"
import { UserWithToken } from '@src/core/auth/types/user-with-token.type'
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { UserService } from "@src/core/user/user.service"
import { PrismaService } from '@src/prisma/prisma.service'
import { compare, hash } from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {}

  // check email and password with stored data
  async authenticate(user: UserForAuth, password: string): Promise<boolean> {
    return await compare(password, user.password)
  }

  // takes input with optional username, email and password
  async register(input: RegisterUserInput): Promise<User> {
    const hashed = await hash(input.password, 10)

    return await this.prisma.$transaction(async (tx) => {
      return await tx.user.create({
        ...input,
        password: hashed
      })
    })

  }

  async authorize(input: AuthorizeUserInput): Promise<UserWithToken> {
    const { email, password } = input

    const user = await this.userService.findForAuth(email)
    if (!user) throw new UnauthorizedException("User not found")

    const isAuthentified = await this.authenticate(user, password)
    if (!isAuthentified) throw new UnauthorizedException("Authentication failed")

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: email
    })

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      token: token
    }
  }
}

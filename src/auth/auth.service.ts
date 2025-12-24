import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import type { AuthorizeUserInput } from "@src/auth/inputs/authorize-user.input";
import type { RegisterUserInput } from "@src/auth/inputs/register-user.input";
import { User } from "@src/common/types/user.type";
import { PrismaService } from "@src/prisma/prisma.service";
import { genSalt, hash } from "bcrypt";

// todo:
// [] - create jwt config
// [] - register user
// [] - login user
// [?] - logout user

interface IAuthUser {
  email: string
  username?: string
  profileImage?: string
  accessToken: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService) {
  }

  async identify(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    return user
  }

  async authenticate(user: User, email: string, hashedPassword: string): Promise<boolean> {
    return user.password === hashedPassword && user.email === email
  }

  async register(input: RegisterUserInput): Promise<void> {
    const { username, email, password } = input

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashed,
      }
    })
  }

  async authorize(input: AuthorizeUserInput): Promise<IAuthUser> {
    const { email, password } = input

    const user = await this.identify(email)

    if (!user) throw new Error("User not found")

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)
    const isAuthN = await this.authenticate(user, email, hashed)

    if (!isAuthN) throw new Error("Authentication failed")

    const accessToken = await this.jwtService.signAsync({
      sub: user.id
    })

    return {
      email: email,
      username: user.username,
      profileImage: user.profileImage,
      accessToken: accessToken,
    }
  }
}

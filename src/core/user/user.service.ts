import { Injectable } from '@nestjs/common'
import { User } from "@src/common/types/user.type"
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { CreateUserInput } from '@src/core/user/inputs/create-user.input'
import { userFields } from '@src/core/user/utils/user-fields.util'
import { PrismaService } from "@src/prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: userFields
    })
  }

  async findForAuth(email: string): Promise<UserForAuth> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        ...userFields,
        password: true
      }
    })
  }

  async create(input: CreateUserInput): Promise<User> {
    const { username, email, password } = input

    return await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      },
      select: userFields
    })
  }

  async update(input: any): Promise<User> {
    const { username, email, password, profileImage } = input

    return await this.prisma.user.update({
      where: { email },
      data: {
        username,
        password,
        profileImage
      },
      select: userFields
    })
  }

  async delete(email: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { email },
      select: userFields
    })
  }
}

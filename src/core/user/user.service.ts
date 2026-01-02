import { Injectable } from '@nestjs/common'
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utils/nullable'
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { CreateUserInput } from '@src/core/user/inputs/create-user.input'
import { UpdateUserInput } from '@src/core/user/inputs/update-user.input'
import { userFields } from '@src/core/user/utils/user-fields.util'
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<Nullable<User>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: userFields
    })

    return user
  }

  public async findForAuth(email: string): Promise<Nullable<UserForAuth>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        ...userFields,
        password: true
      }
    })

    return user
  }

  public async create(input: CreateUserInput): Promise<Nullable<User>> {
    const { username, email, password } = input

    return this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      },
      select: userFields
    })
  }

  // updates only username and profile image \
  // email cannot be changed after registration
  public async update(email: string, input: UpdateUserInput): Promise<Nullable<User>> {
    const { username, profileImage } = input

    try {
      const user = await this.prisma.user.update({
        where: { email },
        data: {
          username,
          profileImage
        },
        select: userFields
      })

      return user
    } catch (error) {
      return null
    }
  }

  public async delete(email: string): Promise<Nullable<User>> {
    try {
      const user = await this.prisma.user.delete({
        where: { email },
        select: userFields
      })

      return user
    } catch (error) {
      return null
    }
  }
}

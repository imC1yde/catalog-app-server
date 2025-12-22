import { Injectable } from '@nestjs/common'
import { User } from "@src/common/types/user.type"
import { CreateUserInput } from '@src/core/user/inputs/create-user.input'
import { mapUser } from '@src/core/user/map/user.map'
import { PrismaService } from "@src/prisma/prisma.service"


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    return mapUser(user)
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      }
    })

    return mapUser(user)
  }
}

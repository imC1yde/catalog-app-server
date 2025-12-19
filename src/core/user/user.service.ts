import { Injectable } from '@nestjs/common';
import { User } from "@src/common/types/user.type";
import { PrismaService } from "@src/prisma/prisma.service";

export type IdentifiedUser = User & { id: string }
export type CreatedUser = Omit<User, "profileImage" | "accessToken">

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByEmail(email: string): Promise<IdentifiedUser | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        password: true
      }
    }) as IdentifiedUser
  }

  async create({ username, email, password }: CreatedUser): Promise<true> {
    return !!(await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      }
    }))
  }
}

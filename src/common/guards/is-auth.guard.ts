import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // available only with graphql
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthorizedException('Неверный токен')

    const token = authHeader.split(" ")[1]

    try {
      const payload = await this.jwtService.verifyAsync(token)
      req['user'] = payload

      return true
    } catch (error) {
      throw new UnauthorizedException('Неверный токен или его срок действия истек')
    }
  }
}
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    let token = req.headers.authorization
    if (!token || !token.startsWith("Bearer ")) throw new Error("Token is invalid!")

    try {
      const payload = await this.jwtService.verifyAsync(token.split(' ')[1])
      req["user"] = payload;

      return true
    } catch (error) {
      throw new Error("Token is expired or invalid!")
    }
  }
}
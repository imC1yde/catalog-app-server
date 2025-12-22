import type { JwtModuleOptions } from "@nestjs/jwt";
import Configuration from "@src/configs/env.config";

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: Configuration().jwt.JWT_SECRET,
  signOptions: { expiresIn: '7d' }
}
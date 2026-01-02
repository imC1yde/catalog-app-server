import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class JwtConfig {
  @Value('JWT_SECRET')
  public readonly jwtSecret!: string
}
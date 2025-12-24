import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class JwtConfig {
  @Value('JWT_SECRET')
  jwtSecret!: string
}
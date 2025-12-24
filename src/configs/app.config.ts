import { Configuration, Value } from '@itgorillaz/configify'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@Configuration()
export class AppConfig {
  @Value('PORT')
  @IsNumber()
  @IsNotEmpty()
  port!: number

  @Value('NODE_ENV')
  @IsString()
  @IsNotEmpty()
  nodeEnv!: string
}


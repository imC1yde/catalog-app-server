import { Configuration, Value } from '@itgorillaz/configify'
import { IsNotEmpty, IsString } from 'class-validator'

@Configuration()
export class RawgConfig {
  @Value('external.rawg.url')
  @IsString()
  @IsNotEmpty()
  rawgApiUrl!: string

  @Value('RAWG_API_KEY')
  @IsString()
  @IsNotEmpty()
  rawgApiKey!: string
}

import { Configuration, Value } from '@itgorillaz/configify'
import { IsNotEmpty, IsString } from 'class-validator'

@Configuration()
export class RawgConfig {
  @Value('external.rawg.url')
  @IsString()
  @IsNotEmpty()
  public readonly url!: string

  @Value('RAWG_API_KEY')
  @IsString()
  @IsNotEmpty()
  public readonly accessKey!: string
}

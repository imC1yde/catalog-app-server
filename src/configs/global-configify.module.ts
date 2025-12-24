import { ConfigifyModule } from '@itgorillaz/configify'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  imports: [
    ConfigifyModule.forRootAsync({
      configFilePath: [ '.env', 'external-api.yml' ]
    })
  ],
  exports: [ ConfigifyModule ]
})
export class GlobalConfigifyModule {}
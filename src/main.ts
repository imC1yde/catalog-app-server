import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import Configuration from '@src/configs/env.config'

// todo:
// [+] - create auth guard
// [] - refresh token
// [] - catalog factory

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });

  await app.listen(Configuration().app.PORT)
}

bootstrap();

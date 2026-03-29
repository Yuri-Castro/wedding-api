import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { setupRedoc } from './redoc.middleware'
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Wedding API')
    .setDescription('HTTP API for the wedding app')
    .setVersion('1.0')
    .addTag('auth', 'Public account endpoints')
    .addTag('users', 'Authenticated user data')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Clerk session token' },
      'clerk',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)

  app.getHttpAdapter().get('/docs-json', (req: Request, res: Response) => {
    res.json(document)
  })

  app.use(
    '/scalar',
    apiReference({
      content: document,
    }),
  )

  setupRedoc(app.getHttpAdapter().getInstance())

  app.enableCors({ origin: true }) // allow any origin (e.g. simulated frontend on file:// or another port)
  app.enableShutdownHooks()
  await app.listen(3001)
}
bootstrap()

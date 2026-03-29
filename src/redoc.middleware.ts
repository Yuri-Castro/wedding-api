import { Express } from 'express'
import redoc from 'redoc-express'

export function setupRedoc(app: Express) {
  const redocOptions = {
    title: 'Your API Title',
    version: '1.0',
    specUrl: '/docs-json',
  }

  app.use('/redoc', redoc(redocOptions))
}

import { Module } from '@nestjs/common'
import { WeddingService } from './wedding.service'
import { WeddingController } from './wedding.controller'
import { WeddingRepository } from './wedding.repository'
import { PrismaWeddingRepository } from './prisma-wedding.repository'

@Module({
  controllers: [WeddingController],
  providers: [WeddingService, { provide: WeddingRepository, useClass: PrismaWeddingRepository }],
})
export class WeddingModule {}

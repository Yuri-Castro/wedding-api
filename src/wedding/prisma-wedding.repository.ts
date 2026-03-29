import { Injectable } from '@nestjs/common'
import type { Prisma, Wedding } from 'prisma/generated/client'
import { PrismaService } from '../prisma.service'
import { WeddingRepository } from './wedding.repository'

@Injectable()
export class PrismaWeddingRepository extends WeddingRepository {
  constructor(private prisma: PrismaService) {
    super()
  }

  async create(data: Prisma.WeddingCreateInput): Promise<Wedding> {
    return this.prisma.wedding.create({ data })
  }

  async findAll(): Promise<Wedding[]> {
    return this.prisma.wedding.findMany()
  }

  async updateById(id: number, data: Prisma.WeddingUpdateInput): Promise<Wedding> {
    return this.prisma.wedding.update({ where: { id }, data })
  }

  async deleteOne(where: Prisma.WeddingWhereUniqueInput): Promise<void> {
    await this.prisma.wedding.delete({ where })
  }

  async findUnique(where: Prisma.WeddingWhereUniqueInput): Promise<Wedding | null> {
    return this.prisma.wedding.findUnique({ where })
  }
}

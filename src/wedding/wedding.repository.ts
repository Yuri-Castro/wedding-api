import type { Prisma, Wedding } from 'prisma/generated/client'

export abstract class WeddingRepository {
  abstract create(data: Prisma.WeddingCreateInput): Promise<Wedding>

  abstract findAll(): Promise<Wedding[]>

  abstract deleteOne(where: Prisma.WeddingWhereUniqueInput): Promise<void>

  abstract updateById(id: number, data: Prisma.WeddingUpdateInput): Promise<Wedding>

  abstract findUnique(where: Prisma.WeddingWhereUniqueInput): Promise<Wedding | null>
}

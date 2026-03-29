import { ApiProperty } from '@nestjs/swagger'
import { Prisma, $Enums } from 'prisma/generated/client'
import { WeddingStatus } from 'prisma/generated/enums'

export class CreateWeddingDto implements Prisma.WeddingCreateInput {
  @ApiProperty({ example: 'Maria & João' })
  name: string

  @ApiProperty({ type: String, format: 'date-time', example: '2026-06-15T18:00:00.000Z' })
  date: Date

  @ApiProperty({ default: 0, required: false })
  guest_count: number = 0

  @ApiProperty({ default: 'BRL', required: false })
  currency: string = 'BRL'

  @ApiProperty({ enum: WeddingStatus, default: WeddingStatus.DRAFT, required: false })
  status: $Enums.WeddingStatus = $Enums.WeddingStatus.DRAFT

  @ApiProperty({ default: false, required: false })
  isPlannerManaged: boolean = false
}

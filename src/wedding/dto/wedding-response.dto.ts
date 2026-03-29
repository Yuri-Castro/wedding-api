import { ApiProperty } from '@nestjs/swagger'
import { Wedding } from 'prisma/generated/client'
import { WeddingStatus } from 'prisma/generated/enums'

export class WeddingResponseDto implements Wedding {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ type: String, format: 'date-time' })
  date: Date

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date

  @ApiProperty()
  guest_count: number

  @ApiProperty()
  currency: string

  @ApiProperty({ enum: WeddingStatus })
  status: WeddingStatus

  @ApiProperty()
  isPlannerManaged: boolean
}

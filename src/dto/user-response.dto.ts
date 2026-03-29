import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty({ nullable: true, required: false, description: 'Clerk user id when linked' })
  subId: string | null

  @ApiProperty()
  email: string

  @ApiProperty({ nullable: true, required: false })
  name: string | null
}

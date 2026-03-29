import { ApiProperty } from '@nestjs/swagger'

export class SignupDto {
  @ApiProperty({ required: false, description: 'Display name' })
  name?: string

  @ApiProperty({ description: 'Unique email address' })
  email: string
}

import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { User as UserModel } from '../prisma/generated/client'
import { SignupDto } from './dto/signup.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { PrismaService } from './prisma.service'

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a user (pre-Clerk signup)' })
  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'User created' })
  async signupUser(@Body() userData: SignupDto): Promise<UserModel> {
    return this.prismaService.user.create({
      data: {
        name: userData?.name,
        email: userData.email,
      },
    })
  }
}

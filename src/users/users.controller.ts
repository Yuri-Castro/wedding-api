import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../prisma.service'
import { UserModel } from 'prisma/generated/models'
import { ClerkAuthGuard } from '../auth/clerk-auth/clerk-auth.guard'
import { UserResponseDto } from '../dto/user-response.dto'

@ApiTags('users')
@ApiBearerAuth('clerk')
@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('me')
  @ApiOperation({ summary: 'Current user from Clerk session' })
  @ApiOkResponse({ type: UserResponseDto })
  async getMe(@Req() request: Request & { user: UserModel }): Promise<UserModel> {
    return request.user
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany()
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User as UserModel,  Prisma } from '../prisma/generated/client';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @Post('signup')
  async signupUser(
    @Body()
    userData: {
      name?: string;
      email: string;
    },
  ): Promise<UserModel> {

    return this.prismaService.user.create({
      data: {
        name: userData?.name,
        email: userData.email,

      },
    });
  }
}

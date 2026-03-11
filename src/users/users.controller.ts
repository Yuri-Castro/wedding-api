import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserModel } from 'prisma/generated/models';

@Controller('users')
export class UsersController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get()
    async getAllUsers(): Promise<UserModel[]> {
        return this.prismaService.user.findMany();
    }
}

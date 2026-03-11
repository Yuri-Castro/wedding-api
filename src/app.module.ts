import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [PrismaService, UsersService],
})
export class AppModule {}

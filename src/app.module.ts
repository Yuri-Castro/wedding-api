import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma.module'
import { WeddingModule } from './wedding/wedding.module'

@Module({
  imports: [PrismaModule, AuthModule, WeddingModule],
  controllers: [AppController, UsersController],
  providers: [UsersService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ClerkAuthGuard } from './clerk-auth/clerk-auth.guard'
import { AuthService } from './auth.service'
import { PrismaModule } from '../prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

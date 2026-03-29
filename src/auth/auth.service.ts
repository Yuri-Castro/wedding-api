import { Body, Injectable, Post } from '@nestjs/common'
import { createClerkClient } from '@clerk/backend'
import { PrismaService } from '../prisma.service'
import { UserModel } from 'prisma/generated/models'
import { Public } from '../public.decorator'

@Injectable()
export class AuthService {
  private readonly clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  })

  constructor(private readonly prismaService: PrismaService) {}

  async getOrCreateUser(subId: string) {
    const clerkUser = await this.clerkClient.users.getUser(subId)

    const email =
      clerkUser.primaryEmailAddress?.emailAddress ??
      clerkUser.emailAddresses?.[0]?.emailAddress ??
      `${subId}@clerk.placeholder`

    const name =
      clerkUser.fullName ??
      ([clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null)

    const user = await this.prismaService.user.upsert({
      where: { subId },
      update: { email, name },
      create: { subId, email, name },
    })

    return user
  }
}

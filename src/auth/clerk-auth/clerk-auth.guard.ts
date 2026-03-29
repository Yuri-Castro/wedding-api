import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { verifyToken } from '@clerk/backend'
import { Reflector } from '@nestjs/core'
import { AuthService } from '../auth.service'
import { JwtPayload } from '@clerk/shared/types'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    let debug = process.env.DEBUG === 'true'

    if (debug) {
      const request = context.switchToHttp().getRequest()
      // Get the first user from the database (for debug purposes)
      const user = await this.authService['prismaService'].user.findFirst()
      console.log('user', user)
      request.user = user
      return true
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException()
    }

    const token = authHeader.replace('Bearer ', '')

    let session: JwtPayload
    try {
      session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      })
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.authService.getOrCreateUser(session.sub)

    request.user = user

    return true
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../prisma/generated/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new PrismaLibSql({ url: process.env.DATABASE_URL! });
    super({ adapter: pool });
  }
  async onModuleInit() {
    await this.$connect();
  }
}

import { PrismaClient, Prisma } from '../prisma/generated/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const pool = new PrismaLibSql({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.user.deleteMany();

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

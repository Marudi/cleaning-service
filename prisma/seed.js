import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { defaultUsers } from '../config/default-users.js';

const prisma = new PrismaClient();

async function main() {
  for (const user of defaultUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // Create user
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
        role: user.role
      }
    });

    // Create rewards for user
    if (user.rewards) {
      await prisma.rewards.upsert({
        where: { userId: createdUser.id },
        update: user.rewards,
        create: {
          userId: createdUser.id,
          ...user.rewards
        }
      });

      // Add some reward history
      await prisma.rewardHistory.createMany({
        data: [
          {
            userId: createdUser.id,
            type: 'EARNED',
            amount: 250,
            description: 'Deep cleaning service',
            status: 'COMPLETED'
          },
          {
            userId: createdUser.id,
            type: 'BONUS',
            amount: 100,
            description: 'Monthly tier bonus',
            status: 'COMPLETED'
          }
        ],
        skipDuplicates: true
      });
    }
  }

  console.log('Database has been seeded with default users and rewards.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
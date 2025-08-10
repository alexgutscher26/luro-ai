import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Development-specific seed data
const devUsers = [
  {
    clerkId: 'dev_user_1',
    email: 'dev1@localhost.com',
    name: 'Dev User 1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev1'
  },
  {
    clerkId: 'dev_user_2',
    email: 'dev2@localhost.com',
    name: 'Dev User 2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev2'
  },
  {
    clerkId: 'dev_user_3',
    email: 'dev3@localhost.com',
    name: 'Dev User 3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev3'
  }
];

async function main() {
  console.log('🛠️ Starting development seed...');
  
  for (const userData of devUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    console.log(`✅ Dev user: ${user.email}`);
  }
  
  console.log('🎉 Development seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Dev seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
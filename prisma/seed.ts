import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const topics = [
  { name: 'Bioteknologi', category: 'Biologi', icon: '🧬', order: 1 },
  { name: 'Ekologi', category: 'Biologi', icon: '🌿', order: 2 },
  { name: 'Keanekaragaman dan Pengelompokan Makhluk Hidup', category: 'Biologi', icon: '🦋', order: 3 },
  { name: 'Makhluk Hidup & Lingkungannya', category: 'Biologi', icon: '🌍', order: 4 },
  { name: 'Molekuler, Sel & Organisme', category: 'Biologi', icon: '🔬', order: 5 },
  { name: 'Organisasi Kehidupan', category: 'Biologi', icon: '🧫', order: 6 },
  { name: 'Pewarisan Sifat', category: 'Biologi', icon: '👨‍👩‍👧', order: 7 },
  { name: 'Sistem-sistem pada Manusia dan Hewan', category: 'Biologi', icon: '🫁', order: 8 },
  { name: 'Besaran, Satuan, dan Pengukuran', category: 'Fisika', icon: '📏', order: 9 },
  { name: 'Zat dan Kalor', category: 'Fisika', icon: '🌡️', order: 10 },
  { name: 'Energi', category: 'Fisika', icon: '⚡', order: 11 },
  { name: 'Gerak dan Gaya', category: 'Fisika', icon: '🎯', order: 12 },
  { name: 'Fluida', category: 'Fisika', icon: '💧', order: 13 },
  { name: 'Getaran, Gelombang, & Bunyi', category: 'Fisika', icon: '🔊', order: 14 },
  { name: 'Cahaya dan Optik', category: 'Fisika', icon: '💡', order: 15 },
  { name: 'Kelistrikan & Kemagnetan', category: 'Fisika', icon: '🔌', order: 16 },
  { name: 'Ilmu Pengetahuan Bumi dan Antariksa', category: 'IPBA', icon: '🪐', order: 17 },
];

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.quizSession.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.topic.deleteMany();

  for (const topic of topics) {
    await prisma.topic.create({
      data: {
        ...topic,
        description: `Materi ${topic.name} untuk persiapan lomba KSR`,
      },
    });
  }
  console.log('✅ Topics created (17 topics)');

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@kyilearning.space',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
      settings: {
        create: {
          studyStreak: 0,
        },
      },
    },
  });
  console.log('✅ Admin user created');
  console.log('   Email: admin@kyilearning.space');
  console.log('   Password: admin123');

  const userPassword = await bcrypt.hash('user123', 10);
  await prisma.user.create({
    data: {
      email: 'user@kyilearning.space',
      name: 'Student',
      password: userPassword,
      role: 'USER',
      settings: {
        create: {
          studyStreak: 0,
        },
      },
    },
  });
  console.log('✅ Main user created');
  console.log('   Email: user@kyilearning.space');
  console.log('   Password: user123');

  const guestPassword = await bcrypt.hash('guest123', 10);
  await prisma.user.create({
    data: {
      email: 'guest@kyilearning.space',
      name: 'Guest',
      password: guestPassword,
      role: 'GUEST',
      settings: {
        create: {
          studyStreak: 0,
        },
      },
    },
  });
  console.log('✅ Guest user created');
  console.log('   Email: guest@kyilearning.space');
  console.log('   Password: guest123');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

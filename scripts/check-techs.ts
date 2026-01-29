import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTechs() {
  try {
    const techs = await prisma.tech.findMany();
    console.log('--- Current Techs in Database ---');
    console.table(techs);
    console.log('---------------------------------');
  } catch (error) {
    console.error('Error fetching techs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTechs();

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL ?? "mysql://root:root@localhost:3306/zombie_hideout";
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
});

async function main() {
  await prisma.donation.upsert({
    where: {
      provider_externalId: {
        provider: "mock",
        externalId: "seed_mock_donation",
      },
    },
    update: {},
    create: {
      provider: "mock",
      externalId: "seed_mock_donation",
      status: "approved",
      amount: "15.00",
      currency: "USD",
      donorAlias: "Dev Supporter",
      locale: "es",
      metadata: { seed: true },
    },
  });

  await prisma.contactMessage.create({
    data: {
      name: "Dev Operator",
      email: "operator@example.com",
      subject: "Seed message",
      message: "Development contact message for local database checks.",
      locale: "en",
      status: "new",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

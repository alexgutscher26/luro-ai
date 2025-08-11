import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🏭 Starting production seed...");
    console.log("⚠️ Production seeding should be minimal and safe");

    // Only add essential data that's safe for production
    // Avoid creating test users or dummy data

    console.log("✅ Production seed completed (minimal data only)");
}

main()
    .catch(e => {
        console.error("❌ Production seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

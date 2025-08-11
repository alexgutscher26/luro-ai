import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample user data with different user types
const sampleUsers = [
    {
        clerkId: "user_demo_admin",
        email: "admin@luro-ai.com",
        name: "Admin User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_creator",
        email: "creator@example.com",
        name: "Content Creator",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_marketer",
        email: "marketer@example.com",
        name: "Social Media Marketer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_agency",
        email: "agency@example.com",
        name: "Digital Agency Owner",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_freelancer",
        email: "freelancer@example.com",
        name: "Freelance Designer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_startup",
        email: "startup@example.com",
        name: "Startup Founder",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_enterprise",
        email: "enterprise@example.com",
        name: "Enterprise Manager",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    },
    {
        clerkId: "user_demo_influencer",
        email: "influencer@example.com",
        name: "Social Influencer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
];

async function seedUsers() {
    console.log("👥 Seeding users...");

    for (const userData of sampleUsers) {
        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {
                name: userData.name,
                avatar: userData.avatar,
                updatedAt: new Date(),
            },
            create: userData,
        });
        console.log(`✅ Created/Updated user: ${user.email} (${user.name})`);
    }
}

async function cleanupTestData() {
    console.log("🧹 Cleaning up existing test data...");

    // Remove test users (keep any real users)
    const testEmails = sampleUsers.map(u => u.email);
    const deletedUsers = await prisma.user.deleteMany({
        where: {
            email: {
                in: testEmails,
            },
        },
    });

    console.log(`🗑️ Removed ${deletedUsers.count} test users`);
}

async function main() {
    console.log("🌱 Starting database seed...");
    console.log("📊 Environment:", process.env.NODE_ENV || "development");

    try {
        // Check if we're in production to prevent accidental seeding
        if (process.env.NODE_ENV === "production") {
            console.log(
                "⚠️ Production environment detected. Skipping seed for safety."
            );
            console.log(
                "💡 To seed production, set FORCE_SEED=true environment variable."
            );

            if (!process.env.FORCE_SEED) {
                return;
            }
        }

        // Optional: Clean existing test data
        if (process.env.CLEAN_SEED === "true") {
            await cleanupTestData();
        }

        // Seed users
        await seedUsers();

        console.log("🎉 Database seed completed successfully!");
        console.log("📝 Seeded data:");
        console.log(`   - ${sampleUsers.length} users`);
        console.log(
            "💡 Use npm run db:studio to view the data in Prisma Studio"
        );
    } catch (error) {
        console.error("❌ Seed failed:", error);
        throw error;
    }
}

main()
    .catch(e => {
        console.error("❌ Seed process failed:", e);
       
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🔌 Database connection closed");
    });

import { MigrationManager } from "../prisma/migrate-utils";
import { program } from "commander";

program
    .name("migrate")
    .description("Database migration management tool")
    .version("1.0.0");

program
    .command("status")
    .description("Check migration status")
    .action(async () => {
        const manager = new MigrationManager();
        const status = await manager.checkMigrationStatus();

        console.log("📊 Migration Status:");
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(
            `Needs Migration: ${status.needsMigration ? "✅ Yes" : "❌ No"}`
        );
        console.log(`Pending Migrations: ${status.pendingMigrations.length}`);
        console.log(`Applied Migrations: ${status.appliedMigrations.length}`);

        if (status.pendingMigrations.length > 0) {
            console.log("\n🔄 Pending Migrations:");
            status.pendingMigrations.forEach(migration => {
                console.log(`  • ${migration}`);
            });
        }
    });

program
    .command("create")
    .description("Create a new migration")
    .argument("<name>", "Migration name")
    .option("-d, --description <description>", "Migration description")
    .action(async (name, options) => {
        const manager = new MigrationManager();
        await manager.createMigration(name, options.description);
    });

program
    .command("deploy")
    .description("Deploy pending migrations")
    .option("-f, --force", "Force deployment without approval")
    .action(async options => {
        if (options.force) {
            process.env.MIGRATION_APPROVED = "true";
        }

        const manager = new MigrationManager();
        await manager.deployMigrations();
    });

program
    .command("reset")
    .description("Reset database (development only)")
    .option("-f, --force", "Force reset without confirmation")
    .action(async options => {
        if (!options.force) {
            console.log(
                "⚠️ This will delete all data. Use --force to confirm."
            );
            return;
        }

        const manager = new MigrationManager();
        await manager.resetDatabase();
    });

program.parse();

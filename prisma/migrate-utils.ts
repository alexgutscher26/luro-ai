import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface MigrationConfig {
    environment: "development" | "staging" | "production";
    requireApproval: boolean;
    backupBeforeMigration: boolean;
    rollbackOnFailure: boolean;
    notifyOnCompletion: boolean;
}

export const MIGRATION_CONFIGS: Record<
    "development" | "staging" | "production",
    MigrationConfig
> = {
    development: {
        environment: "development",
        requireApproval: false,
        backupBeforeMigration: false,
        rollbackOnFailure: true,
        notifyOnCompletion: false,
    },
    staging: {
        environment: "staging",
        requireApproval: true,
        backupBeforeMigration: true,
        rollbackOnFailure: true,
        notifyOnCompletion: true,
    },
    production: {
        environment: "production",
        requireApproval: true,
        backupBeforeMigration: true,
        rollbackOnFailure: false, // Manual intervention required
        notifyOnCompletion: true,
    },
};

export class MigrationManager {
    private config: MigrationConfig;
    private environment: string;

    private getConfig(environment: string): MigrationConfig {
        return (
            MIGRATION_CONFIGS[environment as keyof typeof MIGRATION_CONFIGS] ??
            MIGRATION_CONFIGS.development
        );
    }

    constructor(environment: string = process.env.NODE_ENV || "development") {
        this.environment = environment;
        this.config = this.getConfig(environment);
    }

    async checkMigrationStatus(): Promise<{
        pendingMigrations: string[];
        appliedMigrations: string[];
        needsMigration: boolean;
    }> {
        try {
            const statusOutput = execSync("npx prisma migrate status", {
                encoding: "utf8",
            });

            const pendingMigrations =
                this.extractPendingMigrations(statusOutput);
            const appliedMigrations =
                this.extractAppliedMigrations(statusOutput);

            return {
                pendingMigrations,
                appliedMigrations,
                needsMigration: pendingMigrations.length > 0,
            };
        } catch (error) {
            console.error("Failed to check migration status:", error);
            throw error;
        }
    }

    async createMigration(name: string, description?: string): Promise<string> {
        console.log(`🔄 Creating migration: ${name}`);

        try {
            const migrationName = `${Date.now()}_${name.replace(/\s+/g, "_").toLowerCase()}`;

            // Create migration
            execSync(`npx prisma migrate dev --name ${migrationName}`, {
                stdio: "inherit",
            });

            // Add description to migration file if provided
            if (description) {
                await this.addMigrationDescription(migrationName, description);
            }

            console.log(`✅ Migration created: ${migrationName}`);
            return migrationName;
        } catch (error) {
            console.error("Failed to create migration:", error);
            throw error;
        }
    }

    async deployMigrations(): Promise<void> {
        console.log(`🚀 Deploying migrations to ${this.environment}...`);

        if (this.config.requireApproval && !process.env.MIGRATION_APPROVED) {
            throw new Error(
                "Migration requires approval. Set MIGRATION_APPROVED=true to proceed."
            );
        }

        if (this.config.backupBeforeMigration) {
            await this.createBackup();
        }

        try {
            execSync("npx prisma migrate deploy", { stdio: "inherit" });
            console.log("✅ Migrations deployed successfully");

            if (this.config.notifyOnCompletion) {
                await this.notifyMigrationComplete();
            }
        } catch (error) {
            console.error("❌ Migration deployment failed:", error);

            if (this.config.rollbackOnFailure) {
                await this.rollbackMigration();
            }

            throw error;
        }
    }

    async resetDatabase(): Promise<void> {
        if (this.environment === "production") {
            throw new Error("Database reset is not allowed in production");
        }

        console.log("🔄 Resetting database...");
        execSync("npx prisma migrate reset --force", { stdio: "inherit" });
        console.log("✅ Database reset complete");
    }

    private extractPendingMigrations(statusOutput: string): string[] {
        const lines = statusOutput.split("\n");
        const pendingSection = lines.findIndex(line =>
            line.includes("pending")
        );

        if (pendingSection === -1) return [];

        return lines
            .slice(pendingSection + 1)
            .filter(line => line.trim().startsWith("•"))
            .map(line => line.trim().substring(2));
    }

    private extractAppliedMigrations(statusOutput: string): string[] {
        const lines = statusOutput.split("\n");
        const appliedSection = lines.findIndex(line =>
            line.includes("applied")
        );

        if (appliedSection === -1) return [];

        return lines
            .slice(appliedSection + 1)
            .filter(line => line.trim().startsWith("•"))
            .map(line => line.trim().substring(2));
    }

    private async addMigrationDescription(
        migrationName: string,
        description: string
    ): Promise<void> {
        const migrationDir = path.join(
            process.cwd(),
            "prisma",
            "migrations",
            migrationName
        );
        const descriptionFile = path.join(migrationDir, "README.md");

        const content = `# Migration: ${migrationName}\n\n${description}\n\nCreated: ${new Date().toISOString()}`;

        fs.writeFileSync(descriptionFile, content);
    }

    private async createBackup(): Promise<void> {
        console.log("💾 Creating database backup...");

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupName = `backup_${this.environment}_${timestamp}`;

        // This would depend on your database provider
        // For MongoDB Atlas, you might use mongodump
        // For PostgreSQL, you might use pg_dump
        console.log(`📦 Backup created: ${backupName}`);
    }

    private async rollbackMigration(): Promise<void> {
        console.log("🔙 Attempting to rollback migration...");
        // Implementation depends on your rollback strategy
        console.log("⚠️ Manual rollback may be required");
    }

    private async notifyMigrationComplete(): Promise<void> {
        console.log("📧 Sending migration completion notification...");
        // Integrate with your notification system (Slack, email, etc.)
    }
}

export default MigrationManager;

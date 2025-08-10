# Database Migration Guide

## Overview

This guide covers the database migration workflows for the Luro AI project. Our migration system ensures safe, reliable, and automated database schema changes across all environments.

## Quick Start

### Check Migration Status
```bash
npm run db:migrate:status
```

### Create New Migration
```bash
npm run db:migrate:create "add_user_preferences_table"
```

### Deploy Migrations
```bash
# Development
npm run db:migrate:deploy

# Force deployment (bypass approval)
npm run db:migrate:deploy:force
```

## Environment-Specific Workflows

### Development
- ✅ Automatic migration deployment
- ✅ Database reset allowed
- ❌ No approval required
- ❌ No backup required

### Staging
- ✅ Requires approval
- ✅ Automatic backup
- ✅ Rollback on failure
- ✅ Notification on completion

### Production
- ✅ Requires approval
- ✅ Automatic backup
- ❌ Manual rollback only
- ✅ Notification on completion

## Migration Best Practices

### 1. Schema Design
- Use descriptive migration names
- Keep migrations small and focused
- Ensure backward compatibility when possible
- Add proper indexes for performance

### 2. Testing
- Test migrations in development first
- Verify with realistic data volumes
- Test rollback procedures
- Monitor performance impact

### 3. Documentation
- Document breaking changes
- Include migration purpose
- Provide rollback instructions
- Update API documentation if needed

## CI/CD Integration

### Automatic Checks
- Migration validation on PR
- Schema diff generation
- Backward compatibility checks
- Performance impact assessment

### Deployment Pipeline
1. **PR Creation**: Migration validation
2. **Merge to Main**: Deploy to staging
3. **Manual Trigger**: Deploy to production

## Troubleshooting

### Common Issues

#### Migration Fails
```bash
# Check migration status
npm run db:migrate:status

# Reset development database
npm run db:migrate:reset
```

#### Schema Drift
```bash
# Check for schema differences
npm run db:migrate:check

# Generate new migration
npm run db:migrate:create "fix_schema_drift"
```

#### Production Issues
1. Check application logs
2. Verify database connectivity
3. Review migration logs
4. Contact DevOps team if needed

## Emergency Procedures

### Rollback Process
1. Identify problematic migration
2. Create rollback migration
3. Test rollback in staging
4. Deploy rollback to production
5. Verify application functionality

### Data Recovery
1. Stop application traffic
2. Restore from backup
3. Replay transactions if needed
4. Verify data integrity
5. Resume application traffic

## Monitoring

### Key Metrics
- Migration execution time
- Database performance impact
- Application error rates
- Data integrity checks

### Alerts
- Migration failures
- Performance degradation
- Schema validation errors
- Backup failures

---

**Need Help?** Contact the DevOps team or create an issue in the repository.
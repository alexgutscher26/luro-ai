# Database Migration Checklist

## Pre-Migration

- [ ] **Schema Review**
  - [ ] Schema changes are backward compatible
  - [ ] No breaking changes without proper migration strategy
  - [ ] Indexes are properly defined for performance
  - [ ] Foreign key constraints are correctly set

- [ ] **Testing**
  - [ ] Migration tested in development environment
  - [ ] Migration tested with realistic data volume
  - [ ] Rollback strategy tested and documented
  - [ ] Performance impact assessed

- [ ] **Documentation**
  - [ ] Migration purpose and changes documented
  - [ ] Breaking changes documented
  - [ ] Rollback procedure documented
  - [ ] Team notified of upcoming changes

## Migration Execution

- [ ] **Staging Deployment**
  - [ ] Database backup created
  - [ ] Migration deployed to staging
  - [ ] Application tested in staging
  - [ ] Performance verified in staging

- [ ] **Production Deployment**
  - [ ] Maintenance window scheduled (if needed)
  - [ ] Database backup created
  - [ ] Migration deployed to production
  - [ ] Application health verified
  - [ ] Performance monitoring active

## Post-Migration

- [ ] **Verification**
  - [ ] Data integrity verified
  - [ ] Application functionality tested
  - [ ] Performance metrics within acceptable range
  - [ ] No error logs related to migration

- [ ] **Cleanup**
  - [ ] Old migration artifacts cleaned up
  - [ ] Documentation updated
  - [ ] Team notified of completion
  - [ ] Monitoring alerts updated (if needed)

## Emergency Procedures

- [ ] **Rollback Plan**
  - [ ] Rollback procedure documented and tested
  - [ ] Emergency contacts identified
  - [ ] Rollback triggers defined
  - [ ] Data recovery plan in place

---

**Migration ID**: `_____________________`
**Created By**: `_____________________`
**Review Date**: `_____________________`
**Approved By**: `_____________________`
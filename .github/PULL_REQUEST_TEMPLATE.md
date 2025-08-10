# Pull Request Template

## Description

Briefly describe the changes in this PR and the problem it solves.

**Type of Change**
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring
- [ ] Database migration
- [ ] Configuration change

## Related Issues

Fixes #(issue number)
Closes #(issue number)
Related to #(issue number)

## Changes Made

- [ ] List the main changes
- [ ] Include any new dependencies
- [ ] Mention any breaking changes

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass
- [ ] Test coverage maintained/improved

**Test Commands Run:**
```bash
npm run test
npm run test:coverage
npm run lint
npm run type-check
```

## Database Changes

- [ ] No database changes
- [ ] Schema changes included
- [ ] Migration files created
- [ ] Migration tested locally
- [ ] Backward compatibility maintained
- [ ] Migration checklist followed (if applicable)

## Code Quality

- [ ] Code follows project style guidelines
- [ ] ESLint passes without errors
- [ ] Prettier formatting applied
- [ ] TypeScript compilation successful
- [ ] No new complexity warnings
- [ ] SonarQube quality gate passes
- [ ] Code is self-documenting or properly commented

## Security

- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Authentication/authorization considered
- [ ] CSRF protection maintained
- [ ] Rate limiting considered (if applicable)
- [ ] Environment variables used for secrets

## Performance

- [ ] No performance regressions
- [ ] Database queries optimized
- [ ] Caching strategy considered
- [ ] Bundle size impact assessed
- [ ] Core Web Vitals considered

## Documentation

- [ ] README updated (if needed)
- [ ] API documentation updated
- [ ] Code comments added for complex logic
- [ ] Migration guide updated (if breaking changes)

## Deployment

- [ ] Environment variables documented
- [ ] Deployment steps documented
- [ ] Rollback plan considered
- [ ] Feature flags used (if applicable)

## Screenshots/Videos

<!-- Add screenshots or videos demonstrating the changes -->

## Checklist

- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

---

**Reviewer Notes:**
<!-- Space for reviewers to add notes -->
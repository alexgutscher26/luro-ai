# Luro AI Project Rules

## Project Overview

This is a Next.js 14+ application with TypeScript, Tailwind CSS, and Prisma ORM. The project follows modern React patterns with App Router architecture.

## Code Organization

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components organized by feature
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility libraries and configurations
- `src/functions/` - Pure utility functions
- `src/constants/` - Application constants
- `src/schema/` - Validation schemas
- `src/styles/` - Global styles
- `prisma/` - Database schema and migrations
- `public/` - Static assets

### Component Organization

- Components should be organized by feature/domain
- Use barrel exports in `index.ts` files
- Follow the pattern: `components/{feature}/{ComponentName}.tsx`
- UI components go in `components/ui/`
- Global components go in `components/global/`

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper typing for all function parameters and return values
- Avoid `any` type - use `unknown` or proper typing
- Use const assertions where appropriate

### React Patterns

- Use functional components with hooks
- Prefer composition over inheritance
- Use custom hooks for complex state logic
- Follow the single responsibility principle
- Use proper dependency arrays in useEffect

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Files: kebab-case for utilities, PascalCase for components
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Database models: PascalCase

### Import Organization

1. React and Next.js imports
2. Third-party library imports
3. Internal imports (components, hooks, utils)
4. Relative imports
5. Type-only imports at the end

```typescript
import React from "react";
import { NextPage } from "next";
import { Button } from "@/components/ui";
import { useUser } from "@/hooks";
import { cn } from "@/functions";
import type { User } from "@/types";
```

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Create custom components for repeated patterns
- Use CSS variables for theme colors
- Follow mobile-first responsive design
- Use the `cn()` utility for conditional classes

### Component Styling

- Prefer Tailwind utilities over custom CSS
- Use CSS modules only when Tailwind is insufficient
- Keep styles co-located with components
- Use semantic class names for custom CSS

## Database & API

### Prisma

- Use descriptive model names in PascalCase
- Include proper relations and constraints
- Use enums for fixed value sets
- Add indexes for frequently queried fields
- Use transactions for multi-model operations

### API Routes

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement proper error handling
- Use middleware for common functionality (auth, CORS, rate limiting)
- Validate input using Zod schemas

## Security

### Authentication & Authorization

- Use secure session management
- Implement CSRF protection
- Validate all user inputs
- Use API keys for external services
- Implement rate limiting

### Data Protection

- Sanitize user inputs
- Use environment variables for secrets
- Implement proper CORS policies
- Use HTTPS in production
- Follow OWASP security guidelines

## Testing

### Unit Testing

- Use Jest and React Testing Library
- Test component behavior, not implementation
- Mock external dependencies
- Aim for high test coverage on critical paths
- Use descriptive test names

### Integration Testing

- Test API endpoints with proper setup/teardown
- Use test databases for integration tests
- Test user workflows end-to-end
- Mock external services in tests

## Performance

### Optimization

- Use Next.js Image component for images
- Implement proper caching strategies
- Use dynamic imports for code splitting
- Optimize bundle size with tree shaking
- Use React.memo for expensive components

### Monitoring

- Implement Web Vitals tracking
- Use Lighthouse for performance auditing
- Monitor bundle size with webpack-bundle-analyzer
- Track Core Web Vitals in production

## Development Workflow

### Git Workflow

- Use conventional commits
- Create feature branches from main
- Use pull request templates
- Require code reviews for all changes
- Use semantic versioning for releases

### Code Quality

- Use ESLint and Prettier for code formatting
- Run type checking before commits
- Use Husky for pre-commit hooks
- Follow the established PR review checklist
- Use SonarQube for code quality analysis

### Environment Management

- Use `.env` for local development
- Never commit secrets to version control
- Use different environments (dev, staging, prod)
- Validate environment variables on startup

## Documentation

### Code Documentation

- Use JSDoc for complex functions
- Document API endpoints with OpenAPI
- Keep README files up to date
- Document architectural decisions
- Use Storybook for component documentation

### Comments

- Write self-documenting code
- Comment complex business logic
- Explain "why" not "what"
- Keep comments up to date with code changes

## Deployment

### Production Readiness

- Use proper error boundaries
- Implement graceful error handling
- Use proper logging and monitoring
- Optimize for production builds
- Use CDN for static assets

### CI/CD

- Run tests on all pull requests
- Use automated deployments
- Implement proper rollback strategies
- Monitor deployment health
- Use feature flags for gradual rollouts

## Dependencies

### Package Management

- Use Bun as the package manager
- Keep dependencies up to date
- Audit packages for security vulnerabilities
- Use exact versions for critical dependencies
- Document reasons for major dependency choices

### Third-party Libraries

- Evaluate libraries for bundle size impact
- Prefer well-maintained packages
- Use TypeScript-first libraries when possible
- Consider alternatives before adding new dependencies

---

_Last updated: [Current Date]_
_Version: 1.0.0_

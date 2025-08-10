# Code Review Checklist

## General Review Guidelines

### Code Quality
- [ ] **Readability**: Code is clean, well-structured, and easy to understand
- [ ] **Naming**: Variables, functions, and classes have descriptive names
- [ ] **Comments**: Complex logic is properly documented
- [ ] **Consistency**: Code follows project conventions and style guide
- [ ] **DRY Principle**: No unnecessary code duplication
- [ ] **SOLID Principles**: Code follows good object-oriented design principles

### Functionality
- [ ] **Requirements**: Code meets the specified requirements
- [ ] **Edge Cases**: Edge cases and error conditions are handled
- [ ] **Input Validation**: All inputs are properly validated
- [ ] **Error Handling**: Appropriate error handling and logging
- [ ] **Business Logic**: Logic is correct and efficient

### Testing
- [ ] **Test Coverage**: Adequate test coverage for new code
- [ ] **Test Quality**: Tests are meaningful and test the right things
- [ ] **Test Types**: Unit, integration, and E2E tests as appropriate
- [ ] **Mocking**: Proper use of mocks and stubs
- [ ] **Test Data**: Test data is realistic and covers various scenarios

### Performance
- [ ] **Efficiency**: Code is performant and doesn't introduce bottlenecks
- [ ] **Database**: Queries are optimized and use proper indexing
- [ ] **Caching**: Appropriate caching strategies implemented
- [ ] **Memory**: No memory leaks or excessive memory usage
- [ ] **Bundle Size**: Frontend changes don't significantly increase bundle size

### Security
- [ ] **Authentication**: Proper authentication checks
- [ ] **Authorization**: Appropriate access controls
- [ ] **Input Sanitization**: User inputs are sanitized
- [ ] **SQL Injection**: Protected against SQL injection
- [ ] **XSS Protection**: Protected against cross-site scripting
- [ ] **CSRF Protection**: CSRF tokens used where appropriate
- [ ] **Secrets**: No hardcoded secrets or sensitive data

## Technology-Specific Checks

### Next.js/React
- [ ] **Components**: Components are properly structured and reusable
- [ ] **Hooks**: React hooks used correctly
- [ ] **State Management**: State is managed appropriately
- [ ] **Props**: Props are properly typed and validated
- [ ] **Performance**: No unnecessary re-renders
- [ ] **Accessibility**: Components are accessible (ARIA labels, keyboard navigation)
- [ ] **SEO**: Proper meta tags and structured data

### TypeScript
- [ ] **Type Safety**: Proper TypeScript types used
- [ ] **Type Definitions**: Custom types are well-defined
- [ ] **Generic Types**: Generics used appropriately
- [ ] **Type Guards**: Type guards used for runtime type checking
- [ ] **No Any**: Avoid using `any` type unless absolutely necessary

### Database/Prisma
- [ ] **Schema**: Database schema changes are appropriate
- [ ] **Migrations**: Migrations are safe and reversible
- [ ] **Queries**: Queries are efficient and use proper relations
- [ ] **Transactions**: Database transactions used where needed
- [ ] **Indexes**: Proper indexing for performance
- [ ] **Data Validation**: Schema-level validation implemented

### API Design
- [ ] **RESTful**: API follows REST principles
- [ ] **HTTP Methods**: Appropriate HTTP methods used
- [ ] **Status Codes**: Correct HTTP status codes returned
- [ ] **Request/Response**: Proper request/response structure
- [ ] **Pagination**: Pagination implemented for large datasets
- [ ] **Rate Limiting**: Rate limiting implemented
- [ ] **API Documentation**: API endpoints are documented

## Code Review Process

### Before Review
- [ ] **Self Review**: Author has performed self-review
- [ ] **Tests Pass**: All tests pass locally
- [ ] **Linting**: Code passes linting checks
- [ ] **Type Check**: TypeScript compilation successful
- [ ] **Build**: Application builds successfully

### During Review
- [ ] **Understand Context**: Understand the problem being solved
- [ ] **Check Requirements**: Verify requirements are met
- [ ] **Test Locally**: Pull and test changes locally if needed
- [ ] **Provide Feedback**: Give constructive and specific feedback
- [ ] **Ask Questions**: Ask clarifying questions when needed

### Review Comments
- [ ] **Be Specific**: Point to specific lines and explain issues
- [ ] **Be Constructive**: Suggest improvements, not just problems
- [ ] **Prioritize**: Distinguish between critical issues and suggestions
- [ ] **Be Respectful**: Maintain a positive and collaborative tone

## Approval Criteria

### Must Have (Blocking)
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No critical security vulnerabilities
- [ ] No major performance regressions
- [ ] Requirements are met
- [ ] Breaking changes are documented

### Should Have (Strong Recommendation)
- [ ] Good test coverage
- [ ] Code follows style guidelines
- [ ] Proper error handling
- [ ] Documentation updated
- [ ] No code smells

### Nice to Have (Suggestions)
- [ ] Performance optimizations
- [ ] Additional test cases
- [ ] Code refactoring opportunities
- [ ] Documentation improvements

---

**Review Completed By**: `_____________________`
**Review Date**: `_____________________`
**Approval Status**: `_____________________`
**Follow-up Required**: `_____________________`
![ci](https://github.com/lukeautry/ts-app/workflows/ci/badge.svg?branch=saas)

# ts-app SaaS boilerplate

Interested in something more generic? Check out the [base ts-app branch](https://github.com/lukeautry/ts-app).

The `saas` branch builds on `master` to create a boilerplate suitable for SaaS style apps, i.e. those that have users, authentication, routing, and emails. `saas` also includes some additional tooling for UI development.

All of the documentation in [the base README](./README.BASE.MD) applies to this project.

## Additional Tools

- [cosmos](https://reactcosmos.org/) allows you to create a component library of React components. This is useful during to development to create isolated component and to view a library of components available now.
    - `yarn cosmos` to start Cosmos environment
- Email previews
    - Access previews at http://localhost:3000/email-preview?template=123
    - See the [email](src/email) project for available templates
- [react-router](https://reactrouter.com) for application routing

## Using the CLI

- `yarn cli --help` for full options

## Examples

- Start developer environment: `yarn cli start`
- Create TypeORM migration: `yarn cli migrate create MyNewMigrationName`
- Run pending TypeORM migrations: `yarn cli migrate run`
- Start docker-compose services: `yarn cli docker start`
- Stop docker-compose services: `yarn cli docker stop`
- Generate tsoa routes/OpenAPI client: `yarn cli tsoa`
- Analyze webpack bundle size: `yarn cli webpack analyze`
- Reset developer environment (deletes starter controllers/models/etc, blank slate): `yarn cli reset`
- Run Jest Tests: `yarn cli test jest`
- Run Cypress Tests: `yarn cli test cypress`

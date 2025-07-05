# beaver-core

A modern Node.js/TypeScript API server using Express, Drizzle ORM, Auth0 authentication, and PostgreSQL.

## Features
- Express.js API with modular routing
- Auth0 authentication (JWT)
- PostgreSQL with Drizzle ORM
- TypeScript-first codebase
- Environment-based configuration
- CI/CD and production-ready build with esbuild
- Jest for testing

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Environment Variables
Copy `.env` and/or `.env.example` and fill in your secrets:
```
cp .env.example .env
```
Set up:
- `DATABASE_URL` for your Postgres instance
- Auth0 variables (`AUTH0_DOMAIN`, etc.)
- `API_KEY_SECRET` for API key middleware

### 3. Local Development
```sh
npm run dev
```
Server runs at http://localhost:3000

### 4. Build for Test/Production
```sh
npm run build
```

### 5. Start Test/Production Server
```sh
npm start
```

### 6. Run Tests
```sh
npm test
```

## Deployment
- Use the bundled output in `dist/index.cjs` for production.
- Set environment variables in your deployment platform.
- See `.env.example` for required variables.

## Project Structure
```
src/
  auth/         # Auth0 integration
  db/           # Database and migrations
  middleware/   # Express middleware
  resources/    # API resources (users, accounts, etc.)
  utils/        # Utility functions
  index.ts      # App entry point
```

## Scripts
- `npm run dev` – Start local dev server (with tsx)
- `npm run build` – Bundle with esbuild
- `npm start` – Run production server
- `npm test` – Run tests with Jest

## Local Postgres Database Setup

### 1. Install Postgres (if not already installed)
- **macOS:**
  ```sh
  brew install postgresql
  brew services start postgresql
  ```

### 2. Create a Local Database and User
- Create a database:
  ```sh
  createdb beaver-core-db-local
  ```
- (Optional) Create a user:
  ```sh
  createuser myuser --pwprompt
  # Then grant privileges if needed
  psql -c "GRANT ALL PRIVILEGES ON DATABASE beaver-core-db-local TO myuser;"
  ```

### 3. Update Your .env
Set your local `.env`:
```
DATABASE_URL=postgres://<user>:<password>@localhost:5432/beaver-core-db-local
```
Replace `<user>` and `<password>` with your local Postgres credentials.

### 4. Generate and Run Migrations
- Generate migration files (if you have schema changes):
  ```sh
  npm run generate
  ```
- Run migrations:
  ```sh
  npm run migrate
  ```

Your local database is now ready for local development and testing!

## License
ISC

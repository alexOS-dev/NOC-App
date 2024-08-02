# NOC-APP

# Installation Guide

1. Clone `.env.template` to `.env` and fill in the environment variables:

On macOS or Linux:

```bash
Copy code
cp .env.template .env
```

On Windows (Command Prompt):

```bash
Copy code
copy .env.template .env
```

On Windows (PowerShell):

```powershell
Copy code
Copy-Item .env.template .env
```

2. Install node modules

npm:

```bash
npm install
```

pnpm:

```bash
pnpm install
```

3. Create the database with docker compose

```bash
docker compose up -d
```

4. Run the Prisma migrations

```shell
npx prisma migrate dev
```

5. Run with

```bash
npm run dev
```

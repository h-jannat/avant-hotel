# avant-hotel

## Run the project using docker:

Create .env files from .env.example in `docker` and `backend` folders.

Then run bellow commands:

```sh
cd docker
docker compose up -d --build
```

Wait until the containers start, run the migration and seeder:

```sh
cd backend
npm run knex migrate:latest
npm run knex seed:run
```

Then open the frontend via the url: http://localhost:4200

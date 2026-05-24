Containerizing the API

Build image:

```bash
docker build -t accounting-api ./accounting
```

Run (detached):

```bash
docker run -p 3001:3001 -v "$PWD/accounting/data":/usr/src/app/data --name accounting-api accounting-api
```

Or with docker-compose:

```bash
docker-compose up --build
```

Notes:
- The image uses Node 18 which is compatible with `better-sqlite3`'s native bindings.
- The migration script `npm run migrate:db` runs during image build (best-effort).

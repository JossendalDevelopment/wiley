# wiley

##

To get setup for local development, you'll need to add both firebase serviceAccountKey.json files to `server/certs/`,
as well as an `.env` file in `/server` and `.env.local` in root directory. Also copy `docker-compose.yml` file into `/file-server`.

# To Run Locally

1. clone repo and run `npm install`
2. Until production environment setup is complete, the app must be run in two parts, ignoring the docker-compose file in project root.
    - `cd` into file-server and run `docker-compose up --build` against the docker-compose.yml file you copied from above. This will start the file server and start the live video streams.
    - `cd` back to root and run `npm run dev`. This will start the express api server and Vue web server.
    - App should be available at `localhost:5001`

## Commands

### Run server and client locally in development

```
npm run dev
```

### Build and deploy to firebase hosting

```
npm run deploy
```

### Compiles and hot-reloads for development W/O express

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run Unit tests with vue-test-utils

```
npm run test
```

### Run E2E tests with cypress

```
npm run cypress:open
```

### Lints and fixes files

```
npm run lint
```

# wiley

##

To get setup for local development, you'll need to add a firebase serviceAccountKey.json file in `server/certs/`,
as well as an `.env` file in `/server` and `.env.local` in root directory.

TODO Add instruction on how vuex modules are wrapped in global plugins and general file structure.

## Commands

### Run Dockerized with nginx and node w/o dev dependencies

```
./prodserver.sh
```

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

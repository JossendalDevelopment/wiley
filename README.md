# Wiley VaaS - Video as a sensor

## Requirements
1. [Node.js](https://nodejs.org/en/) and npm
2. [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
3. Preferrably Chrome browser


## Installation Instructions

1. Clone repo 
2. Run `npm install` or `npm ci` in the following directories - 
    - /
    - /server
    - /file-server
3. Follow configuration instructions
    - Authentication is currently handled by Firebase. You will need to create an account or see an admin about obtaining the necessary certification.json files. These files, ideally one for dev and prod environments, will need to be placed in `/server/certs`. Mark thier file names as they will need to added to the docker-compose file later.
    - In `/config/production_example.js`, configure the needed hostnames and ports. Rename this file to `production.js`.
    - Create `.env.local` and/or `.env.production` as necessary from the template in `/env_example`.
    - Create `docker.compose.yml` - need to create example version for version control.
    - Create `docker.compose-dev.yml` from `docker-compose-dev-EXAMPLE.yaml`.
    - Review `vue.config.js` and `nginx.conf` if you changed any service names or ports from the given template.

## Commands


### Run server and client locally in development

```
docker-compose -f docker-compose-dev up --build
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

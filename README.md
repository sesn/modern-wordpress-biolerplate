# Modern Wordpress Biolerplate

> Making theme and plugin development easier for both frontend and backend developers

## Features:

- Webpack
- Live reload with BrowserSync
- SCSS/SASS Support
- Using Docker
- Plugin management using Composer
- Import and Export DB

## Requirements

  - Node js
  - Yarn
  - PHP and Composer
  - Docker for Mac / Windows
  - Docker Compose

## Getting started

```bash
git clone https://github.com/sesn/modern-wordpress-biolerplate.git
yarn install
composer install # if plugins needs to be installed
docker-compose up
```

## For Local Development

```bash
yarn start
```

## For Production

```bash
yarn build
```

## Changing ports

There are two ports invloved. 
  - 1 port - For *dockerized wordpress instance* 
  - 2 port - For *BrowserSync*

  ### Port 1

  ```yml
  # docker-compose.yml
  ...
    ports:
      - "9009:80" # 
  ...
  ```

  ### Port 2
  
  ```js
  // scripts/webpack.config.js
  ...
    new BrowserSyncPlugin({
      ...
      port: 4000, // Change second port here
      ...
    })
  ...
  ```


## Project Structure

```bash
.
├── composer.json                # Compose dependencies (plugins)
├── composer.lock                # Composer lock file
├── docker-compose.yml           # Docker Compose configuration
├── footer.php
├── functions.php
├── header.php
├── index.php
├── package.json                 # Node.js dependencies
├── page.php  
├──scripts                       # Build / Dev Scripts
│   ├── build.js                 # Build task
│   ├── start.js                 # Start task
│   └── webpack.config.js        # Webpack configuration   
└──src
    ├── index.js                 # JavaScript entry point
    ├── routes                   # Routes
    │   ├── common.js            # JS that will run on EVERY page
    │   └── <xxx>.js             # JS that will run on pages with <xxx> slug 
    ├── style.scss               # SCSS style entry point
    ├── styles                   # SCSS
    │   ├── _global-vars.scss
    │   ├── _base.scss
    │   └── ...
    └── util
        ├── Router.js            # HTML5 Router, DO NOT TOUCH
        └── camelCase.js 
                # Helper function for Router, DO NOT TOUCH
```

## New Features Checklist

  - [ ] Redis Cache
  - [ ] Separate Branch for hosting in nginx 
  - [ ] Bash script to replace the URL for dev, test and production environments
  - [ ] AWS S3 Uploads
  - [ ] Plugin management using wp-cli (Additional)
  - [ ] docker-compose.yml for production
  - [ ] Installing and renewing SSL Certificate using lets-encrypt
  - [ ] Automatic creation of initial wordpress setup using environment variables.
  - [ ] Cron job for sql backup
  - [ ] wp-config.php edit functionality
  - [ ] Adding default security measures for wordpress
      - [ ] Prevent execution of php inside `uploads` folder
      - [ ] Disable indexing
      - [ ] Clickjacking Prevention
      - [ ] Add relevant third party source in header-access-origin



## Contribution and Suggestions:
  - Feel free to suggest any features and to contribute.


#### Thanks:
- This is a custom upgrade version of presspack developed by Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

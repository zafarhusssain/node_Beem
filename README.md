# Beem API application

## Overview

This project is for creating an API server for Beam project. Project is based on the AdonisJS a powerful framework of Node Js. Beem is an application where users can create and login their accounts using this api end-points to avail different services offered by merchants. This includes the following main entities;

1. Customer: End user consuming services offered by merchants with following end-points
   - Reset password
   - Change password
   - Change profile information
   - Add credit card
   - Remove credit card
   - Search service providers
   - Request service quote
   - Accept service quote
   - View service status
   - End service
2. Merchant: Business entity offering services and processing payments through Beem

   - Reset password
   - Change password
   - Change business profile information
   - Receive service quote request
   - Issue service quote
   - View customer list
   - End service for customer
   - Schedule service
   - View schedule
   - Edit schedule
   - Update service status

3. Administrator: Employee of beam

### Techical Specification

This project is created with AdonisJs, a powerful framework of NodeJs, it comes pre-configured with;

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

### Pre-Requisite

In order to run the APIs, you need to install following softwares/pakacges in your Machine (PC/Laptop).

1. Node Js - Latest recommended version (https://nodejs.org/en/)
2. Adonisjs - A framweork of Node Js; by running this command in terminal/command prompt (`npm i -g @adonisjs/cli`)

### Database

Download the postgreSQL from the following link **(for local setup or Cloud Machine)**
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

create database with name `beem2020` or whichever name you put. (Need to replace this in `.env` if other than `beem2020`)

### API

Use the git command to clone the repository from version control

```bash
git clone [path_of_project_on_version_control]
```

Example:

```bash
git clone https://github.com/ahsancodeitect1/BeemAPI.git
```

or manually clone the repo and then run `npm install`.

> NOTE: Make a copy of `.env.example` if parent directory and rename it to `.env`.

Set the database related configurtions in `.env`. Keep the DB_CONNECTION same as pg

- DB_CONNECTION=pg -_(conection name, pg as to postgreSQL)_
- DB_HOST=127.0.0.1 -_(host name, url of IP)_
- DB_PORT=5432 -_(database port, default of pg)_
- DB_USER=postgres -_(username default of pg)_
- DB_PASSWORD=your_password -_(password during installation or recieved from cloud service provider)_
- DB_DATABASE=beem2020 -_(database name)_

### Migrations and Data Seed

> NOTE: Migration and seeds to be run once only.

Run the following command to run startup migrations. Following this, seed command will insert default data in the database.

```js
adonis migration:run
```

with seed

```js
adonis migration:run --seed
```

Or run seperately,

```js
adonis seed
```

Or as per Beem schema run following command,

```js
adonis seed --files RoleSeeder.js
adonis seed --files StatusSeeder.js
adonis seed --files AdminTypeSeeder.js
adonis seed --files AddressTypeSeeder.js
adonis seed --files CardTypeSeeder.js
adonis seed --files ResponseTypeSeeder.js
adonis seed --files ResponseSeeder.js
adonis seed --files UserSeeder.js
```

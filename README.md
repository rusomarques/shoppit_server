# Shoppit - Server

> Express server to compute and store data, providing services to Shoppit mobile app.

<p align="center">
  <img src="./assets/logo.png" width="30%">
</p> 



Shoppit is a social shopping app that recommends curated items and reminds you of your friends' birthdays. 

## Table of contents

- [Screenshots](#screenshots)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Postman collection](#postman-collection)
- [Tech Stack](#tech-stack)
- [Developers team](#developers-team)
- [License](#license)

## Screenshots

<p align="center">
  <img src="./assets/first.jpg" />
</p>

<p align="center">
  <img src="./assets/second.jpg" />
</p>



## Getting started

A few things you have to take in consideration before using Shoppit - Server

After cloning the repo you'll have to :

### Install global and local dependancies:

- [Node](https://nodejs.org/en/): `brew install node`
- [Npm](https://www.npmjs.com/): `npm install`
- [Homebrew](https://brew.sh/) 

### Migrate and connect Postgres database

Install PostgreSQL on your machine:

```bash
brew install postgres
```

Access PostgresSQL command line on the default database "postgres":

```bash
psql postgres
```

Your bash should now look like this:

```bash
psql (10.5)
Type "help" for help.

postgres=#
```

Now create a new database for the current user and connect it:

```bash
postgres=# CREATE DATABASE shoppit;
postgres=# \c shoppit;
```

The result will be:

```bash
You are now connected to database "shoppit" as user <user-name>.
shoppit=#
```

Now set a password for the current user:

```bash
shoppit=# ALTER USER <user_name> WITH PASSWORD 'new_password';
```

**Always remember the semicolon or the syntax will not work.**

Now your database setup is finished and you are ready to connect it with the server.

You can change the port or database name on postgres configuration database.

If you would like to use other SQL database you should just configure it in config/config.json.

Finally, migrate the database on your local machine:

```bash
cd shoppit-server
npm run recreateDb
```

## Usage

Start the server:

```bash
cd shoppit_server
npm start
```

## Postman collection

Use the [Trash Walk.postman_collection.json](https://github.com/cherlin/trash-walk-backend/blob/develop/Trash-Walk.postman_collection.json) to test all API endpoints.

## Tech Stack

### Back-end:

- [Koa](https://koajs.com/)
- [PostgreSQL](https://www.postgresql.org/) & [PostGIS](https://postgis.net/)
- [Sequelize](http://docs.sequelizejs.com/)

### Front-end: [trash-walk-frontend](https://github.com/cherlin/trash-walk-frontend)

## Developers team

- Christofer Herlin - [GitHub](https://github.com/cherlin) - [LinkedIn](https://www.linkedin.com/in/cherl/)
- Juliane Nagao - [GitHub](https://github.com/junagao) - [LinkedIn](https://www.linkedin.com/in/junagao/)
- Necati Özmen - [GitHub](https://github.com/necatiozmen) - [LinkedIn](https://www.linkedin.com/in/necatiozmen/)
- Marco Antonio Ghiani - [GitHub](https://github.com/marcoantonioghiani01) - [LinkedIn](https://www.linkedin.com/in/marcoantonioghiani/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/cherlin/trash-walk-backend/blob/develop/LICENSE) file for details
# Koa REST API Boilerplate

Boilerplate for Node.js Koa REST API application with sequelize and postgresql for backend purposes.

# Table of contents

1. [Requirements](#requirements)
   1. [Node.js](#node_js)
   2. [Yarn](#yarn)
   3. [Postgresql](#postgresql)
      1. [Install](#postgresql_install)
      2. [Configure User](#postgresql_configure)
2. [Getting Started](#getting_started)
3. [Commands](#commands)

## Requirements <a name="requirements"></a>

If you will install something we recommend to update and upgrade before

```shell
$ sudo apt update
$ sudo apt upgrade
```

### Node.js <a name="node_js"></a>

```shell
# If you don't have curl
$ sudo apt install curl

# Add Node.js PPA (Personal Package Archives)
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

# Install Node.js
$ sudo apt install nodejs

# Check version installed
$ node -v
```

### Yarn <a name="yarn"></a>

```shell
# If you don't have curl
$ sudo apt install curl

# Add yarn PPA (Personal Package Archives)
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Install yarn
$ sudo apt install yarn

# Check version
$ yarn --version
```

### Postgresql <a name="postgresql"></a>

#### Install <a name="postgresql_install"></a>

```shell
$ sudo apt install postgresql postgresql-contrib

# Check version
$ psql --version
```

#### Configure User <a name="postgresql_configure"></a>

First we need to create an user

```shell
$ sudo -u postgres createuser --interactive
```

Then we need to give a password to the new user

```shell
$ sudo -u postgres psql

postgres= alter user <username> with encrypted password '<password>';
postgres= \q
```

## Getting Started <a name="getting_started"></a>

First you need to clone the boilerplate repository

```shell
$ git clone https://github.com/nrfreudenberg/koa-sequelize-boilerplate your-project-name
$ cd your-project-name
$ yarn
$ rm -rf .git

# If you want to start a new git repository
$ git init
```

Now, you need to configure your .env file. If you don't have an user and his password in postgres, check how to [configure an user](#postgresql_configure). If you have an user and it's password in postgres, then simply write it in .env

```
DB_USERNAME=username
DB_PASSWORD=password
```

The final step is to create the database, then just need to run migrates and seeders. The database will have the name of the variable DB_NAME in .env

```shell
$ node_modules/.bin/sequelize db:create
$ node_modules/.bin/sequelize db:migrate
$ node_modules/.bin/sequelize db:seed:all
```

You can start the application with yarn

```shell
$ yarn start
```

Now you can see the content of the homepage in [localhost:3000](http://localhost:3000)

Also you can find the books that were created with the seeders in [localhost:3000/books](http://localhost:3000/books)

It's common to not upload the .env file to the repository. To stop tracking the .env file that is in the repository you just need to run the following command:

```shell
$ git update-index --assume-unchanged .env
```


## Commands <a name="commands"></a>

To run the application

```shell
# Run normally
$ yarn start

# Run the application with nodemon for development
$ yarn dev
```

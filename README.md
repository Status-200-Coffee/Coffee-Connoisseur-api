# Coffee Connoisseur API ☕️
## Project Summary

Welcome to the Coffee Connoisseur API!👋 
This API serves as the backend for the Coffee Connoisseur app, an application that allows users to search for coffee shops near them on a map, collect beans as a reward system when they post pictures of the coffee they purchase from the coffee shops. 
If you're interested in the app itself, you can find it on GitHub : https://github.com/Status-200-Coffee/Coffee-Connoisseur-app 

## Introduction

This API is built using Node.js, Koa.js, and MongoDB. It provides endpoints for retrieving coffee shop data, user profiles, and reward systems. 

## API Base URL

You can access the API at: https://coffee-connoisseur-api.onrender.com/api

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of Node.js and MongoDB.
* You have a MongoDB Atlas account.

## MongoDB Atlas Setup

Before you can use the Coffee Connoisseur API, you need to set up a MongoDB Atlas account and create a database cluster. Follow these steps:

1. Sign up for a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account if you don't have one.
2. Once you're logged in, create a new project.
3. Within the new project, build a new cluster.
4. After the cluster is created, click on "CONNECT" button.
5. Add your current IP address to the IP Whitelist and create a MongoDB user with a username and password.
6. Choose "Connect your application".
7. Copy the connection string and replace `<username>` and `<password>` with the MongoDB user you created in step 5.

You will use this connection string in the `.env` file in the "Setup" section.

## Setup

To use the Coffee Connoisseur API, follow these steps:

1. Clone this repository to your local machine:
``` 
$ git clone https://github.com/Status-200-Coffee/Coffee-Connoisseur-api.git`
```
2. Navigate to the project directory:
```
$ cd Coffee-Connoisseur-api
```

3. Install the necessary dependencies by running the command `npm install`:
```
$ npm install
```

4. Create a `.env` file in the root directory of the project and add this to the `.gitignore` file

5. Inside the `.env` file, add the following line:

    ```
    URI=<Your MongoDB Atlas Connection String>
    ```

    Replace `<Your MongoDB Atlas Connection String>` with your actual MongoDB Atlas connection string. It should look something like this:

    ```
    URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```

    Make sure to replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas username, password, and database name respectively.

6. Save the `.env` file and proceed with the rest of the instructions.

## Seeding the databases:

Run the following scripts to seed the MongoDB Atlas databases:

* To **seed** the development database:

```
$ npm run seed-dev
```

* To **seed** the test database:

```
$ npm run test
```

## Running the tests:

Run all Jest test suites using the following script:

```
$ npm run test
```

## Connecting the app to your local host:

Run the server locally using the following command and follow the link to http://localhost:9090 

```
$ npm run start
```
You should see the following string in the console:
`"Server running on http://localhost:9090"`

## Feedback and Support

If you have any feedback or need support regarding the Coffee Connoisseur API, please create an issue on this repository.

Thank you for using the Coffee Connoisseur API! ☕️
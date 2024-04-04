# Coffee Connoisseur API
## Project Summary
Welcome to the Coffee Connoisseur API! This API serves as the backend for the Coffee Connoisseur app, an application that allows users to search for coffee shops near them on a map, collect beans as a reward system when they post pictures of the coffee they purchase from the coffee shops. 
If you're interested in the app itself, you can find it on GitHub : https://github.com/Status-200-Coffee/Coffee-Connoisseur-app 

## Introduction
This API is built using Node.js, Koa.js, and MongoDB. It provides endpoints for retrieving coffee shop data, user profiles, and reward systems. 

## API Base URL
You can access the API at: https://coffee-connoisseur-api.onrender.com/api

## Prerequisites
Before you begin, ensure you have met the following requirements:
* You have installed the latest version of Node.js and MongoDB.
* You have a MongoDB Atlas account.

## Setup
To use the Coffee Connoisseur API, follow these steps:

1. Clone this repository to your local machine` git clone https://github.com/Status-200-Coffee/Coffee-Connoisseur-api.git`
2. Navigate to the project directory.
3. Install the necessary dependencies by running the command `npm install`.
2. Navigate to the project directory.
3. Create a `.env` file in the root directory of the project.
4. Inside the `.env` file, add the following line:

    ```
    URI=<Your MongoDB Atlas Connection String>
    ```

    Replace `<Your MongoDB Atlas Connection String>` with your actual MongoDB Atlas connection string. It should look something like this:

    ```
    URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```

    Make sure to replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas username, password, and database name respectively.

5. Save the `.env` file and proceed with the rest of the instructions.

## Feedback and Support
If you have any feedback or need support regarding the Coffee Connoisseur API, please create an issue on this repository.

Thank you for using the Coffee Connoisseur API! ☕️
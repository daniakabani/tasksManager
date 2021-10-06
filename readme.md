# Tasks Manager
this is a fullstack project using node.js, express, knex, objection, react among others, the goal of this project is to simulate a dashboard experience to the user with controlled access and features based on roles.

Before we start, make sure you have node.js version 12.x.x or higher, and make sure that knex is installed globally `npm i -g knex`

#### To start the application on your local machine do the following:

1. Copy .env.example to .env in the same directory
2. Edit the .env file and add DB settings
3. install dependencies by running `npm run resolve`
4. start the migration process by running `npm run migrate`
5. Run the seed to create core entities `npm run seed`
6. run the dev server (nodemon) using this command `npm run dev` or the standard one with `npm start`
7. run the front end application with `npm run app`

#### NPM scripts:

1. `npm run dev` runs the application in dev mode using nodemon
2. `npm run migrate` run knex migration to populate DB tables and changes
3. `npm run resolve` install the dependencies and nested ones with one command
4. `npm run seed` Run seed script to populate important DB records
5. `npm run rollback` Rollback the latest migration
5. `npm run app` run the react front end application based on create-react-app
6. `npm run reset` combines rollback with migrate and seed altogether

## default super user credentials to login
- username: `admin`
- password: `admin123`
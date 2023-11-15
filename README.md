# Briefly Planning Poker

Briefly planning poker is an online Planning Poker/Scrum Poker tool that lets you estimate effort, time of development and other characteristics of your agile team tasks.
In it, you can:
 - **Create and manage agile squads**
 - **Create or import tasks, or user stories from other project management tools**
 - **Comment on and estimate different task measures such as story points, likeability, and etc in your product backlog**
 - **Integrate with other platforms to make your sprint planning sessions easier**

## Tech Stack

This project is composed by a front end SPA and a REST API server. The entire stack uses [Typescript](https://www.typescriptlang.org/) as the programming language, in order to provide type-safety, IDE intellisense autocompletion and some other features to promote a better developer experience.  
Furthermore, this is our tech stack:

 - [Vue](https://vuejs.org/)
 - [Sass](https://sass-lang.com/)
 - [Express](https://expressjs.com/)
 - [Prisma ORM](https://www.prisma.io/)
 - [Zod](https://zod.dev/)
 - [Zodios](https://www.zodios.org/)
 - [PostgreSQL](https://www.postgresql.org/)

## Repository structure

The project is organized as a monorepo. It is subdivided in a bunch of different workspaces, that can be found at the [packages](./packages/) folder.

 - [@briefly/prisma](./packages/prisma/)  
The projects data models definitions and data access client. Uses the Prisma ORM to enable having a unique source of truth, as well as a source for run-time validation, using [Zod](https://zod.dev/).

- [@briefly/apidef](./packages/apidef/)  
The projects API definitions. Establishes an interface between the front and back end of the application.  
Uses [Zod](https://zod.dev/) and [Zodios](https://www.zodios.org/).

- [@briefly/api](./packages/api/)  
The projects back end, written using [Express](https://expressjs.com/).  

- [@briefly/front](./packages/front/)  
The projects front-end application, written in [Vue](https://vuejs.org/).

## Dependencies

## Installation and usage

## Getting help

## Contributions

Do you have a suggestion to improve this project somehow? Feel free to open an issue, or submit a PR.  
The contribution guide can be accessed [here](./CONTRIBUTING.md)


### Development

To run the entire application (front-end, back-end and database): `docker compose up front`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name, and then start the REST API and front end servers.

To run only the back end: `docker compose up api`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api.

To run only database: `docker compose up db`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name.

### Development workflow

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

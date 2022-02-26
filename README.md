# Nx Post w/ MikroORM

This is a fullstack application to demonstrates the following technologies:
- [NestJS](https://nestjs.com)
- [MongoDB](https://www.mongodb.com/)
- [MikroORM](https://mikro-orm.io/)
- [AutoMapper TypeScript](https://automapperts.netlify.app)
- [Angular](https://angular.io) (WIP)
- [Nx](https://nx.dev)

## Prerequisite

- Docker
- Node

## Get Started

1. Install dependencies `npm i`
2. (In a separate terminal) Run `docker-compose up` to spin up a local MongoDB instance
3. Run `npm run start:api` to start the API
4. Open `http://localhost:3333/api/docs` to access the SwaggerUI

## Entities

This repo is a mean for me to practice using `MikroORM` so that I can work on supporting it in `AutoMapper TypeScript`. There are 3 entities:
- User
- Post
- Comment

## Capabilities

- Authentication / Authorization with JWT. Registration and Login are implemented.
- User can CRUD on Post
- User can Like/Unlike a Post
- User can create a Comment for a Post
- User can delete a Comment for a Post if the User is either: Post author OR Comment author

## Nx

This repo is also to showcase how to organize a fullstack application with `Nx`. Running `nx graph` will show the Dependency Graph between all libraries in the monorepo. At a high level, there are 3 types of libraries in this monorepo:
- Feature
- DataAccess
- Utils

### NestJS

- Root `AppModule` only imports `Feature` libraries. `Feature` libraries contain their respective `Controller`
- `Feature` libraries can import `DataAccess`. `DataAccess` libraries initialize their respective Entity and provide the `Service` layer. `DataAccess` CANNOT import `Feature`
- `Utils` libraries CANNOT import `Feature` and `DataAccess`. They contain non-business code like `ExceptionFilter`, common Decorators etc...

### Angular

TBD

## Contributing

PRs are most definitely welcomed. Detail is TBD

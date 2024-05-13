# MEAN-Stack Example: Tasks-Management

based on the tutorial: https://www.mongodb.com/resources/languages/mean-stack-tutorial
with some adaptions, e.g. running all components locally in docker containers.

## Overview

MEAN is a technology stack used for building full-stack applications. 

It's a combination of the following technologies:
- MongoDB — a document database
- Express — a Node.js framework for building APIs
- Angular — a front-end application framework
- Node.js — a server-side JavaScript runtime environment

## Setup

* Install NodeJS (https://nodejs.org/). Check your installed version with ```node --version```, it should be >20.
* Install mongosh (https://www.mongodb.com/docs/mongodb-shell/install/). Try it out in a cmd-line using command ```mongosh```.
* Install Angular CLI: ```npm install -g @angular/cli```. Check your installed version with ```ng version```, it should be >17

## HOWTO 
To create the sample on your own.

### Setup the frameworks
* Create the NodeJS server-side application in the sub-directory server/ using ```npm init -y```
* Install NodeJS dependencies: ```npm install cors dotenv express mongodb```
* Install TypeScript (for the server application): ```npm install --save-dev typescript @types/cors @types/express @types/node ts-node```
* Create the TypeScript-Compiler configuration file [tsconfig.json](./server/tsconfig.json)

### Setup the containers

* Use the official MongoDB docker container (see https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
* and configure the docker-compose.yml file (see https://geshan.com.np/blog/2023/03/mongodb-docker-compose/)

### Implement the source-files
* Create an interface for the model [task.ts](./server/src/task.ts)
* Create database-access implementation [database.ts](server/src/database.ts)
* Create the server entry-point [server.ts](server/src/server.ts)
* Set the configuration in the [.env](server/.env) file.
* Verify that the NodeJS server works correctly using ```npx ts-node src/server.ts```. 
  It should print out ```Server running at http://localhost:5200...``` (Stop server by pressing Ctrl+C)

### Implement the REST-Server
* Create the REST-API endpoints and routes [task.routes.ts](server/src/task.routes.ts)
* Use the routes in server, extend [server.ts](server/src/server.ts)
* Test your RESTful Server using the HTTP-Requests in [rest-tests.http](server/rest-tests.http)

### Implement the client-side application with Angular
* IMPORTANT: During working with Angular CLI the server MUST be running! Use a separate terminal ans run ```npx ts-node src/server.ts```.
* Create a new Angular application in the directory client/: 
  ```
  ng new client --inline-template --inline-style --minimal --routing --style=css
  ```
  Keep all default settings.
* Navigate to the new application (```cd client```) and run the application: ```ng serve -o```.  
  After the application is built, you should see a new tab in your browser window with the application running. It should say "Welcome to client!"

* Install Angular Material: ```ng add @angular/material```
* Create an task interface on the client side ```ng generate interface task``` and add the implementation [task.ts](client/src/app/task.ts)
* Create a service for handling all communication with the REST service ```ng generate service task``` and add the imlementation [task.service.ts](client/src/app/task.service.ts)
* Create a tasks list component ```ng generate component tasks-list``` and add the implementation in [tasks-list.components.ts](client/src/app/tasks-list/tasks-list.component.ts)
* Register the component as a route in [app.routes.ts](client/src/app/app.routes.ts)
* Update [app.component.ts](client/src/app/app.component.ts) to use the implemented component.
* Start angular ```ng serve -o``` and check your first component using the web-browser: http://localhost:4200/ . You should see a list of your tasks already.
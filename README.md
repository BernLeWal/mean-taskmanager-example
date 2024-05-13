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

## HOWTO 
To create the sample on your own.

### Setup the frameworks
* Create the NodeJS server-side application in the sub-directory server/ using ```npm init -y```
* Install NodeJS dependencies: ```npm install cors dotenv express mongodb```
* Install TypeScript (for the server application): ```npm install --save-dev typescript @types/cors @types/express @types/node ts-node```

### Setup the containers

* Use the official MongoDB docker container (see https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
* and configure the docker-compose.yml file (see https://geshan.com.np/blog/2023/03/mongodb-docker-compose/)

### Implement the source-files
* Create the TypeScript-Compiler configuration file [tsconfig.json](./server/tsconfig.json)
* Create an interface for the model [task.ts](./server/src/task.ts)
* Create database-access implementation [database.ts](server/src/database.ts)
* Create the server entry-point [server.ts](server/src/server.ts)
* Set the configuration in the [.env](server/.env) file.
* Verify that the NodeJS server works correctly using ```npx ts-node src/server.ts```. 
  It should print out ```Server running at http://localhost:5200...``` (Stop server by pressing Ctrl+C)
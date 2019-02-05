# Floom Backend Challenge

## Instructions

Install prisma, docker and docker compose

Prisma : https://www.prisma.io/

`npm install -g prisma`

Docker https://www.docker.com/
(refer to the docker doc for your OS)

Then run :

```bash
docker-compose up -d
yarn bootstrap
yarn seed
yarn start
```

For simplicity purpose a graphql playground is provided.
Making an HTTP endpoint is trivial once the queries and mutations are working (http://myapi/graphql?query={me{name}}).

Playground is available at http://localhost:4000

## Tech choices explanation

- Prisma : Very good ORM / API layer, creates a javascript API to interact with your database using GraphQL in a very efficient and fast way
- GraphQL Yoga : Combine express, node and apollo-server to reduce boilerplate.
- Typescript : Painless use of ES6 features in node

## Step by step process

1. A lot of iteration on paper to get a good idea of how to solve the problem
2. Choosing the right tool for the job (See tech choices explanation)
3. Setting up prisma and the dev environment
4. Creating the database schema using the notes taken at step 1
5. Seeding the database and playing with the prisma client
6. Creating a proper GraphQL schema
7. Writing a server with the required CRUD operations for our endpoint
8. Adding the requested features :
   - Notification
   - UpdateOrderStatus
   - CreateFirstUpdate
9. Cleaning up code and writing document and readme

## GraphQL operations walkthrough

**Look at the console output from the yarn start script**

### Creating Updates

A third party provider send an update to our graphql endpoint :

```graphql
mutation {
  createOrderUpdate(
    consignmentId: 1
    coordinate: [5, 6]
    status: EN_ROUTE_TO_SENDER
  ) {
    id
    status
  }
}
```

The following logic happen :

1. The update gets stored in the DB
2. The order associated to the consignment gets updated
3. A notification get sent to the user

### Creating new orders

The API gets accessed like this to create a new order

```graphql
mutation {
  createOrder(
    userId: "Use a valid user id (output from yarn seed)"
    consignmentId: 2
    deliveryLocation: [0, 1]
    senderLocation: [1, 2]
    active: true
    currentStatus: BEING_PREPARED
  ) {
    id
    active
  }
}
```

Once created it creates a new update, then send it to the user.

### Query Orders

Here are a few examples queries to inspect the orders :

```graphql
query {
  activeOrders {
    id
    consignmentId
  }
}
```

```graphql
query {
  orderByConsignmentId(consignmentId: 1) {
    id
    user {
      id
      name
    }
    deliveryLocation {
      latitute
      longitude
    }
    senderLocation {
      latitute
      longitude
    }
    updates {
      id
      coordinate {
        latitute
        longitude
      }
      status
    }
    active
    currentStatus
  }
}
```

We can leverage the full GraphQL power to query only the field we need for our front end.

## Conclusion :

A few things could be improved:

1. Directory structure => As the service scale, properly structure the directory will be important.
2. Extract the helper methods from index.ts, and clean up some of the code.
3. Performances, schema, and query efficiency can all be improved.
4. Adding middlewares and other micro-services, ejecting from graphql yoga (https://github.com/prisma/graphql-yoga) to access the underlying express instance, or switch to express + node, apollo server or equivalent. The third party provider might not want to send a graphQL HTTP request, or we might want to do some parsing and checks before writing to the DB.
5. Authentification.
6. Write tests to make sure everything works.

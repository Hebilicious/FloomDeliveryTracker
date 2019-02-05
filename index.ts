import { prisma } from "./generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";
// import axios from "axios"

/**
 * This is the notification handler. The request part is commented out on purpose.
 * This is being triggered after the resolvers successfully do something.
 * @param orderUpdate
 */
const sendNotificationToUser = async (orderUpdate, order = null) => {
  console.log("SendNotifiactionToUser Methods", orderUpdate);
  const orders = await prisma.orders({
    where: { consignmentId: orderUpdate.consignmentId }
  });
  const user = await prisma.order({ id: orders[0].id }).user();
  const requestData = {
    userId: user,
    message: `Hi, ${user.name}, here's the status of your update !`,
    data: orderUpdate
  };
  console.log(`Sending a notification to user ${user.id}`);
  console.log(requestData);
  return order ? order : orderUpdate;
  // await axios.post("/floom.test/api/send_notification", requestData);
};

/**
 * Updates the order after a third party order update is processed.
 * @param orderUpdate
 */
const updateOrderStatus = async orderUpdate => {
  console.log("UpdateOrderStatus Methods", orderUpdate);
  const orders = await prisma.orders({
    where: { consignmentId: orderUpdate.consignmentId }
  });
  const orderId = orders[0].id;
  await prisma.updateOrder({
    data: { currentStatus: orderUpdate.status },
    where: { id: orderId }
  });
  if (["DELIVERED", "UNSUCCESSFUL"].includes(orderUpdate.status)) {
    await prisma.updateOrder({
      data: { active: false },
      where: { id: orderId }
    });
  }
  console.log(`Updated order ${orderId}`);
  return orderUpdate;
};

/**
 * Generate an OrderUpdate entry in the database. This is called
 * after a new Order is created. An User notification is also sent
 * after the OrderUpdate is created
 * @param order
 */
const createFirstUpdate = async order => {
  console.log("Create first update", order);
  const newOrderUpdate = await prisma.createOrderUpdate({
    consignmentId: 1,
    coordinate: { create: { latitute: 51.5007, longitude: 0.1246 } },
    status: "EN_ROUTE_TO_RECIPIENT"
  });
  // return order;
  return sendNotificationToUser(newOrderUpdate, order);
};

/**
 * This is the resolvers for our GraphQL endpoint.
 */
const resolvers = {
  Query: {
    activeOrders(parent, args, context) {
      return context.prisma.orders({ where: { active: true } });
    },
    orderByUser(parent, args, context) {
      return context.prisma.user({ id: args.userId }).orders();
    },
    order(parent, args, context) {
      return context.prisma.order({ id: args.orderId });
    },
    orderByConsignmentId(parent, args, context) {
      return context.prisma.orders({
        where: { consignmentId: args.consignmentId }
      });
    }
  },
  Mutation: {
    createOrder(parent, args, context) {
      return context.prisma
        .createOrder({
          user: { connect: { id: args.userId } },
          consignmentId: args.consignmentId,
          deliveryLocation: {
            create: {
              latitute: args.deliveryLocation[0],
              longitude: args.deliveryLocation[1]
            }
          },
          senderLocation: {
            create: {
              latitute: args.senderLocation[0],
              longitude: args.senderLocation[1]
            }
          },
          active: args.active,
          currentStatus: args.currentStatus
        })
        .then(order => createFirstUpdate(order));
    },
    createOrderUpdate(parent, args, context) {
      return context.prisma
        .createOrderUpdate({
          consignmentId: args.consignmentId,
          coordinate: {
            create: {
              latitute: args.coordinate[0],
              longitude: args.coordinate[1]
            }
          },
          status: args.status
        })
        .then(orderUpdate => updateOrderStatus(orderUpdate))
        .then(orderUpdate => sendNotificationToUser(orderUpdate));
    }
  },
  Order: {
    user(parent, args, context) {
      return context.prisma.order({ id: parent.id }).user();
    },
    deliveryLocation(parent, args, context) {
      return context.prisma.order({ id: parent.id }).deliveryLocation();
    },
    senderLocation(parent, args, context) {
      return context.prisma.order({ id: parent.id }).senderLocation();
    },
    updates(parent, args, context) {
      return context.prisma.orderUpdates({
        where: { consignmentId: args.consignmentId }
      });
    }
  },
  OrderUpdate: {
    coordinate(parent, args, context) {
      return context.prisma.orderUpdate({ id: parent.id }).coordinate();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma
  }
});
server.start(() => console.log("Server is running on http://localhost:4000"));

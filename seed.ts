import { prisma } from "./generated/prisma-client";

// A `main` function so that we can use async/await
// This will seed the database with some dummy data.
// Flush the database with prisma reset if you run this manually.
async function main() {
  // Create a new user called `Emmanuel`
  const newUser = await prisma.createUser({ name: "Emmanuel" });
  //   console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
  // Delete an user by id
  //   await prisma.deleteUser({ id: "cjrrxx8cq00140730oa1jj0go" });

  //Create a new order
  const newOrder = await prisma.createOrder({
    user: { connect: { id: newUser.id } },
    consignmentId: 1,
    deliveryLocation: { create: { latitute: 51.5014, longitude: 0.1419 } },
    senderLocation: { create: { latitute: 51.4839, longitude: 0.6044 } },
    active: true,
    currentStatus: "BEING_PREPARED"
  });

  //Should Create new update and add active and current status if missing
  //Create a new order update
  const newOrderUpdate = await prisma.createOrderUpdate({
    consignmentId: 1,
    coordinate: { create: { latitute: 51.5007, longitude: 0.1246 } },
    status: "EN_ROUTE_TO_RECIPIENT"
  });

  //   const allCoordinates = await prisma.coordinates();
  const allOrders = await prisma.orders();
  const allOrderUpdates = await prisma.orderUpdates();
  const allUsers = await prisma.users();
  //   console.log(allCoordinates);
  console.log(allOrders);
  console.log(allOrderUpdates);
  console.log(allUsers);
}

main().catch(e => console.error(e));

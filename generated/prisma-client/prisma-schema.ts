export const typeDefs = /* GraphQL */ `type AggregateCoordinate {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateOrderUpdate {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Coordinate {
  latitute: Float!
  longitude: Float!
}

type CoordinateConnection {
  pageInfo: PageInfo!
  edges: [CoordinateEdge]!
  aggregate: AggregateCoordinate!
}

input CoordinateCreateInput {
  latitute: Float!
  longitude: Float!
}

input CoordinateCreateOneInput {
  create: CoordinateCreateInput
}

type CoordinateEdge {
  node: Coordinate!
  cursor: String!
}

enum CoordinateOrderByInput {
  latitute_ASC
  latitute_DESC
  longitude_ASC
  longitude_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoordinatePreviousValues {
  latitute: Float!
  longitude: Float!
}

type CoordinateSubscriptionPayload {
  mutation: MutationType!
  node: Coordinate
  updatedFields: [String!]
  previousValues: CoordinatePreviousValues
}

input CoordinateSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CoordinateWhereInput
  AND: [CoordinateSubscriptionWhereInput!]
  OR: [CoordinateSubscriptionWhereInput!]
  NOT: [CoordinateSubscriptionWhereInput!]
}

input CoordinateUpdateDataInput {
  latitute: Float
  longitude: Float
}

input CoordinateUpdateManyMutationInput {
  latitute: Float
  longitude: Float
}

input CoordinateUpdateOneRequiredInput {
  create: CoordinateCreateInput
  update: CoordinateUpdateDataInput
  upsert: CoordinateUpsertNestedInput
}

input CoordinateUpsertNestedInput {
  update: CoordinateUpdateDataInput!
  create: CoordinateCreateInput!
}

input CoordinateWhereInput {
  latitute: Float
  latitute_not: Float
  latitute_in: [Float!]
  latitute_not_in: [Float!]
  latitute_lt: Float
  latitute_lte: Float
  latitute_gt: Float
  latitute_gte: Float
  longitude: Float
  longitude_not: Float
  longitude_in: [Float!]
  longitude_not_in: [Float!]
  longitude_lt: Float
  longitude_lte: Float
  longitude_gt: Float
  longitude_gte: Float
  AND: [CoordinateWhereInput!]
  OR: [CoordinateWhereInput!]
  NOT: [CoordinateWhereInput!]
}

scalar Long

type Mutation {
  createCoordinate(data: CoordinateCreateInput!): Coordinate!
  updateManyCoordinates(data: CoordinateUpdateManyMutationInput!, where: CoordinateWhereInput): BatchPayload!
  deleteManyCoordinates(where: CoordinateWhereInput): BatchPayload!
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  createOrderUpdate(data: OrderUpdateCreateInput!): OrderUpdate!
  updateOrderUpdate(data: OrderUpdateUpdateInput!, where: OrderUpdateWhereUniqueInput!): OrderUpdate
  updateManyOrderUpdates(data: OrderUpdateUpdateManyMutationInput!, where: OrderUpdateWhereInput): BatchPayload!
  upsertOrderUpdate(where: OrderUpdateWhereUniqueInput!, create: OrderUpdateCreateInput!, update: OrderUpdateUpdateInput!): OrderUpdate!
  deleteOrderUpdate(where: OrderUpdateWhereUniqueInput!): OrderUpdate
  deleteManyOrderUpdates(where: OrderUpdateWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Order {
  id: ID!
  user: User!
  consignmentId: Int!
  deliveryLocation: Coordinate!
  senderLocation: Coordinate!
  updates(where: OrderUpdateWhereInput, orderBy: OrderUpdateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderUpdate!]
  active: Boolean
  currentStatus: OrderStatus!
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  user: UserCreateOneInput!
  consignmentId: Int!
  deliveryLocation: CoordinateCreateOneInput!
  senderLocation: CoordinateCreateOneInput!
  updates: OrderUpdateCreateManyInput
  active: Boolean
  currentStatus: OrderStatus!
}

type OrderEdge {
  node: Order!
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  consignmentId_ASC
  consignmentId_DESC
  active_ASC
  active_DESC
  currentStatus_ASC
  currentStatus_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderPreviousValues {
  id: ID!
  consignmentId: Int!
  active: Boolean
  currentStatus: OrderStatus!
}

enum OrderStatus {
  BEING_PREPARED
  EN_ROUTE_TO_SENDER
  WAITING_AT_SENDER
  EN_ROUTE_TO_RECIPIENT
  DELIVERED
  UNSUCESSFUL
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
  AND: [OrderSubscriptionWhereInput!]
  OR: [OrderSubscriptionWhereInput!]
  NOT: [OrderSubscriptionWhereInput!]
}

type OrderUpdate {
  id: ID!
  consignmentId: Int!
  coordinate: Coordinate!
  status: OrderStatus!
}

type OrderUpdateConnection {
  pageInfo: PageInfo!
  edges: [OrderUpdateEdge]!
  aggregate: AggregateOrderUpdate!
}

input OrderUpdateCreateInput {
  consignmentId: Int!
  coordinate: CoordinateCreateOneInput!
  status: OrderStatus!
}

input OrderUpdateCreateManyInput {
  create: [OrderUpdateCreateInput!]
  connect: [OrderUpdateWhereUniqueInput!]
}

type OrderUpdateEdge {
  node: OrderUpdate!
  cursor: String!
}

input OrderUpdateInput {
  user: UserUpdateOneRequiredInput
  consignmentId: Int
  deliveryLocation: CoordinateUpdateOneRequiredInput
  senderLocation: CoordinateUpdateOneRequiredInput
  updates: OrderUpdateUpdateManyInput
  active: Boolean
  currentStatus: OrderStatus
}

input OrderUpdateManyMutationInput {
  consignmentId: Int
  active: Boolean
  currentStatus: OrderStatus
}

enum OrderUpdateOrderByInput {
  id_ASC
  id_DESC
  consignmentId_ASC
  consignmentId_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderUpdatePreviousValues {
  id: ID!
  consignmentId: Int!
  status: OrderStatus!
}

input OrderUpdateScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  consignmentId: Int
  consignmentId_not: Int
  consignmentId_in: [Int!]
  consignmentId_not_in: [Int!]
  consignmentId_lt: Int
  consignmentId_lte: Int
  consignmentId_gt: Int
  consignmentId_gte: Int
  status: OrderStatus
  status_not: OrderStatus
  status_in: [OrderStatus!]
  status_not_in: [OrderStatus!]
  AND: [OrderUpdateScalarWhereInput!]
  OR: [OrderUpdateScalarWhereInput!]
  NOT: [OrderUpdateScalarWhereInput!]
}

type OrderUpdateSubscriptionPayload {
  mutation: MutationType!
  node: OrderUpdate
  updatedFields: [String!]
  previousValues: OrderUpdatePreviousValues
}

input OrderUpdateSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderUpdateWhereInput
  AND: [OrderUpdateSubscriptionWhereInput!]
  OR: [OrderUpdateSubscriptionWhereInput!]
  NOT: [OrderUpdateSubscriptionWhereInput!]
}

input OrderUpdateUpdateDataInput {
  consignmentId: Int
  coordinate: CoordinateUpdateOneRequiredInput
  status: OrderStatus
}

input OrderUpdateUpdateInput {
  consignmentId: Int
  coordinate: CoordinateUpdateOneRequiredInput
  status: OrderStatus
}

input OrderUpdateUpdateManyDataInput {
  consignmentId: Int
  status: OrderStatus
}

input OrderUpdateUpdateManyInput {
  create: [OrderUpdateCreateInput!]
  update: [OrderUpdateUpdateWithWhereUniqueNestedInput!]
  upsert: [OrderUpdateUpsertWithWhereUniqueNestedInput!]
  delete: [OrderUpdateWhereUniqueInput!]
  connect: [OrderUpdateWhereUniqueInput!]
  disconnect: [OrderUpdateWhereUniqueInput!]
  deleteMany: [OrderUpdateScalarWhereInput!]
  updateMany: [OrderUpdateUpdateManyWithWhereNestedInput!]
}

input OrderUpdateUpdateManyMutationInput {
  consignmentId: Int
  status: OrderStatus
}

input OrderUpdateUpdateManyWithWhereNestedInput {
  where: OrderUpdateScalarWhereInput!
  data: OrderUpdateUpdateManyDataInput!
}

input OrderUpdateUpdateWithWhereUniqueNestedInput {
  where: OrderUpdateWhereUniqueInput!
  data: OrderUpdateUpdateDataInput!
}

input OrderUpdateUpsertWithWhereUniqueNestedInput {
  where: OrderUpdateWhereUniqueInput!
  update: OrderUpdateUpdateDataInput!
  create: OrderUpdateCreateInput!
}

input OrderUpdateWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  consignmentId: Int
  consignmentId_not: Int
  consignmentId_in: [Int!]
  consignmentId_not_in: [Int!]
  consignmentId_lt: Int
  consignmentId_lte: Int
  consignmentId_gt: Int
  consignmentId_gte: Int
  coordinate: CoordinateWhereInput
  status: OrderStatus
  status_not: OrderStatus
  status_in: [OrderStatus!]
  status_not_in: [OrderStatus!]
  AND: [OrderUpdateWhereInput!]
  OR: [OrderUpdateWhereInput!]
  NOT: [OrderUpdateWhereInput!]
}

input OrderUpdateWhereUniqueInput {
  id: ID
}

input OrderWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  consignmentId: Int
  consignmentId_not: Int
  consignmentId_in: [Int!]
  consignmentId_not_in: [Int!]
  consignmentId_lt: Int
  consignmentId_lte: Int
  consignmentId_gt: Int
  consignmentId_gte: Int
  deliveryLocation: CoordinateWhereInput
  senderLocation: CoordinateWhereInput
  updates_every: OrderUpdateWhereInput
  updates_some: OrderUpdateWhereInput
  updates_none: OrderUpdateWhereInput
  active: Boolean
  active_not: Boolean
  currentStatus: OrderStatus
  currentStatus_not: OrderStatus
  currentStatus_in: [OrderStatus!]
  currentStatus_not_in: [OrderStatus!]
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  coordinates(where: CoordinateWhereInput, orderBy: CoordinateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Coordinate]!
  coordinatesConnection(where: CoordinateWhereInput, orderBy: CoordinateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CoordinateConnection!
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  orderUpdate(where: OrderUpdateWhereUniqueInput!): OrderUpdate
  orderUpdates(where: OrderUpdateWhereInput, orderBy: OrderUpdateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderUpdate]!
  orderUpdatesConnection(where: OrderUpdateWhereInput, orderBy: OrderUpdateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderUpdateConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  coordinate(where: CoordinateSubscriptionWhereInput): CoordinateSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  orderUpdate(where: OrderUpdateSubscriptionWhereInput): OrderUpdateSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  name: String
}

input UserUpdateInput {
  name: String
}

input UserUpdateManyMutationInput {
  name: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
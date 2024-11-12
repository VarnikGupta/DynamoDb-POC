const { dynamoDB, documentClient } = require("../config/db");

//Create Table
async function createTable() {
  const params = {
    TableName: "UserTable",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
      { AttributeName: "OrderStatus", AttributeType: "S" },
      { AttributeName: "OrderDate", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          { AttributeName: "OrderStatus", KeyType: "HASH" },
          { AttributeName: "OrderDate", KeyType: "RANGE" },
        ],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  dynamoDB.createTable(params, (err, data) => {
    if (err) {
      console.log("Error creating table:", err);
    } else {
      console.log("Table created:", data);
    }
  });
}

//Insert single Item
async function insertItem() {
  const params = {
    TableName: "UserTable",
    Item: {
      PK: "USER#123",
      SK: "PROFILE",
      UserId: "123",
      UserName: "Alice",
      UserEmail: "alice@example.com",
    },
  };

  documentClient.put(params, (err, data) => {
    if (err) {
      console.log("Error inserting item in table:", err);
    } else {
      console.log("Item inserted successfully:", data);
    }
  });
}

//Batch Insert Items
async function batchInsertItems() {
  const batchItems = [
    // User Profiles
    {
      PK: "USER#1",
      SK: "PROFILE",
      UserId: "1",
      UserName: "Alice",
      UserEmail: "alice@example.com",
    },
    {
      PK: "USER#2",
      SK: "PROFILE",
      UserId: "2",
      UserName: "Bob",
      UserEmail: "bob@example.com",
    },
    {
      PK: "USER#3",
      SK: "PROFILE",
      UserId: "3",
      UserName: "Charlie",
      UserEmail: "charlie@example.com",
    },
    {
      PK: "USER#4",
      SK: "PROFILE",
      UserId: "4",
      UserName: "Diana",
      UserEmail: "diana@example.com",
    },
    {
      PK: "USER#5",
      SK: "PROFILE",
      UserId: "5",
      UserName: "Eve",
      UserEmail: "eve@example.com",
    },

    // Orders
    {
      PK: "USER#1",
      SK: "ORDER#ORD001",
      OrderId: "ORD001",
      OrderDate: "2024-10-10",
      OrderStatus: "Shipped",
      OrderTotal: 45.0,
      Items: ["item1", "item2"],
    },
    {
      PK: "USER#1",
      SK: "ORDER#ORD002",
      OrderId: "ORD002",
      OrderDate: "2024-10-15",
      OrderStatus: "Pending",
      OrderTotal: 60.0,
      Items: ["item3", "item4"],
    },
    {
      PK: "USER#1",
      SK: "ORDER#ORD003",
      OrderId: "ORD003",
      OrderDate: "2024-10-20",
      OrderStatus: "Delivered",
      OrderTotal: 75.0,
      Items: ["item5", "item6"],
    },
    {
      PK: "USER#2",
      SK: "ORDER#ORD004",
      OrderId: "ORD004",
      OrderDate: "2024-10-05",
      OrderStatus: "Shipped",
      OrderTotal: 85.0,
      Items: ["item7"],
    },
    {
      PK: "USER#2",
      SK: "ORDER#ORD005",
      OrderId: "ORD005",
      OrderDate: "2024-10-18",
      OrderStatus: "Pending",
      OrderTotal: 30.0,
      Items: ["item8", "item9"],
    },
    {
      PK: "USER#2",
      SK: "ORDER#ORD006",
      OrderId: "ORD006",
      OrderDate: "2024-10-22",
      OrderStatus: "Cancelled",
      OrderTotal: 100.0,
      Items: ["item10", "item11"],
    },
    {
      PK: "USER#3",
      SK: "ORDER#ORD007",
      OrderId: "ORD007",
      OrderDate: "2024-10-12",
      OrderStatus: "Delivered",
      OrderTotal: 55.0,
      Items: ["item12", "item13"],
    },
    {
      PK: "USER#3",
      SK: "ORDER#ORD008",
      OrderId: "ORD008",
      OrderDate: "2024-10-15",
      OrderStatus: "Pending",
      OrderTotal: 90.0,
      Items: ["item14"],
    },
    {
      PK: "USER#3",
      SK: "ORDER#ORD009",
      OrderId: "ORD009",
      OrderDate: "2024-10-20",
      OrderStatus: "Shipped",
      OrderTotal: 65.0,
      Items: ["item15", "item16"],
    },
    {
      PK: "USER#4",
      SK: "ORDER#ORD010",
      OrderId: "ORD010",
      OrderDate: "2024-10-01",
      OrderStatus: "Delivered",
      OrderTotal: 120.0,
      Items: ["item17"],
    },
    {
      PK: "USER#4",
      SK: "ORDER#ORD011",
      OrderId: "ORD011",
      OrderDate: "2024-10-18",
      OrderStatus: "Pending",
      OrderTotal: 40.0,
      Items: ["item18", "item19"],
    },
    {
      PK: "USER#4",
      SK: "ORDER#ORD012",
      OrderId: "ORD012",
      OrderDate: "2024-10-22",
      OrderStatus: "Shipped",
      OrderTotal: 80.0,
      Items: ["item20"],
    },
    {
      PK: "USER#5",
      SK: "ORDER#ORD013",
      OrderId: "ORD013",
      OrderDate: "2024-10-07",
      OrderStatus: "Delivered",
      OrderTotal: 95.0,
      Items: ["item21", "item22"],
    },
    {
      PK: "USER#5",
      SK: "ORDER#ORD014",
      OrderId: "ORD014",
      OrderDate: "2024-10-17",
      OrderStatus: "Cancelled",
      OrderTotal: 110.0,
      Items: ["item23"],
    },
    {
      PK: "USER#5",
      SK: "ORDER#ORD015",
      OrderId: "ORD015",
      OrderDate: "2024-10-23",
      OrderStatus: "Shipped",
      OrderTotal: 55.0,
      Items: ["item24", "item25"],
    },
    {
      PK: "USER#2",
      SK: "ORDER#ORD016",
      OrderId: "ORD016",
      OrderDate: "2024-10-25",
      OrderStatus: "Pending",
      OrderTotal: 30.0,
      Items: ["item26"],
    },
    {
      PK: "USER#1",
      SK: "ORDER#ORD017",
      OrderId: "ORD017",
      OrderDate: "2024-10-27",
      OrderStatus: "Delivered",
      OrderTotal: 60.0,
      Items: ["item27"],
    },
    {
      PK: "USER#3",
      SK: "ORDER#ORD018",
      OrderId: "ORD018",
      OrderDate: "2024-10-29",
      OrderStatus: "Pending",
      OrderTotal: 50.0,
      Items: ["item28", "item29"],
    },
    {
      PK: "USER#4",
      SK: "ORDER#ORD019",
      OrderId: "ORD019",
      OrderDate: "2024-10-30",
      OrderStatus: "Shipped",
      OrderTotal: 75.0,
      Items: ["item30"],
    },
    {
      PK: "USER#5",
      SK: "ORDER#ORD020",
      OrderId: "ORD020",
      OrderDate: "2024-11-01",
      OrderStatus: "Pending",
      OrderTotal: 85.0,
      Items: ["item31", "item32"],
    },
  ];

  const params = {
    RequestItems: {
      UserTable: batchItems.map((item) => ({
        PutRequest: {
          Item: item,
        },
      })),
    },
  };

  documentClient.batchWrite(params, (err, data) => {
    if (err) {
      console.log("Error inserting items in table:", err);
    } else {
      console.log("Items inserted successfully:", data);
    }
  });
}

//batch delete
async function batchDeleteItems() {
  const batch = [
    { PK: "USER#1", SK: "ORDER#ORD0045" },
    { PK: "USER#2", SK: "ORDER#ORD004" },
    { PK: "USER#3", SK: "ORDER#ORD007" },
    { PK: "USER#4", SK: "ORDER#ORD010" },
    { PK: "USER#5", SK: "ORDER#ORD013" },
  ];

  const params = {
    RequestItems: {
      UserTable: batch.map((item) => ({
        DeleteRequest: { Key: { PK: item.PK, SK: item.SK } },
      })),
    },
  };

  documentClient.batchWrite(params, (err, data) => {
    if (err) {
      console.log("Error deleting items in table:", err);
    } else {
      console.log("Items deleted successfully:", data);
    }
  });
}

//query for user profile
async function getUserProfile(userId) {
  const params = {
    TableName: "UserTable",
    KeyConditionExpression: "PK=:pk AND SK=:sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": "PROFILE",
    },
  };

  documentClient.query(params, (err, data) => {
    if (err) {
      console.log("Error in fetching profile:", err);
    } else {
      console.log("User Profile fetched successfully:", data);
    }
  });
}

//query for all orders of a user
async function getUserOrders(userId) {
  const params = {
    TableName: "UserTable",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :order)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":order": "ORDER#",
    },
  };

  documentClient.query(params, (err, data) => {
    if (err) {
      console.log("Error in fetching orders:", err);
    } else {
      console.log("Order History fetched successfully:", data);
    }
  });
}

//query on GSI for orders by status
async function getOrdersByFilter(status, startDate, endDate) {
  const params = {
    TableName: "UserTable",
    IndexName: "GSI1",
    KeyConditionExpression:
      "OrderStatus = :status AND OrderDate BETWEEN :startDate AND :endDate",
    ExpressionAttributeValues: {
      ":status": status,
      ":startDate": startDate,
      ":endDate": endDate,
    },
  };

  documentClient.query(params, (err, data) => {
    if (err) {
      console.log("Error in fetching orders:", err);
    } else {
      console.log("Orders fetched successfully:", data);
    }
  });
}

//list all tables
async function listTables() {
  dynamoDB.listTables({}, (err, data) => {
    if (err) {
      console.log("Error Connecting to DynamoDB Local: ", err);
    } else {
      console.log("Connected Successfully! Available tables:", data.TableNames);
    }
  });
}

//update an item
async function updateItem() {
  const params = {
    TableName: "UserTable",
    Key: { PK: "USER#1", SK: "ORDER#ORD001" },
    UpdateExpression: "SET #status = :statusValue, #total = :totalValue",
    ExpressionAttributeNames: {
      "#status": "OrderStatus",
      "#total": "OrderTotal",
    },
    ExpressionAttributeValues: {
      ":statusValue": "Completed",
      ":totalValue": 100.0,
    },
    ReturnValues: "UPDATED_NEW",
  };

  documentClient.update(params, (err, data) => {
    if (err) {
      console.log("Error updating item ", err);
    } else {
      console.log("Successfull updation of item!:", data);
    }
  });
}

//delete an item
async function deleteItem(pk, sk) {
  const params = {
    TableName: "UserTable",
    Key: { PK: pk, SK: sk },
  };

  documentClient.delete(params, (err, data) => {
    if (err) {
      console.log("Error deleting item", err);
    } else {
      console.log("Item deleted Successfully!:", data);
    }
  });
}

//scan
async function scanOperation() {
  const params = {
    TableName: "UserTable",
    FilterExpression: "#status = :statusValue AND #total > :totalValue",
    ExpressionAttributeNames: {
      "#status": "OrderStatus",
      "#total": "OrderTotal",
    },
    ExpressionAttributeValues: {
      ":statusValue": "Completed",
      ":totalValue": 50.0,
    },
  };

  documentClient.scan(params, (err, data) => {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log("Successfull!:", data);
    }
  });
}

//cursor
async function cursor() {
  const params = {
    TableName: "UserTable",
    Limit: 21,
    FilterExpression: "#status = :statusValue",
    ExpressionAttributeNames: {
      "#status": "OrderStatus",
    },
    ExpressionAttributeValues: {
      ":statusValue": "Completed",
    },
    ExclusiveStartKey: null,
  };

  documentClient.scan(params, (err, result) => {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log("Scan results:", result);
      if (result.LastEvaluatedKey) {
        console.log(
          "More items available. Use this key for next page:",
          result.LastEvaluatedKey
        );
      } else {
        console.log("No more items to fetch.");
      }
    }
  });
}

module.exports = {
  createTable,
  insertItem,
  batchInsertItems,
  batchDeleteItems,
  getUserProfile,
  getUserOrders,
  getOrdersByFilter,
  listTables,
  updateItem,
  deleteItem,
  scanOperation,
  cursor,
};

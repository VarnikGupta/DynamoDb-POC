const express = require("express");
const {
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
} = require("./operations/index");

const app = express();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// createTable();
// insertItem();
// batchInsertItems();
// batchDeleteItems();
// getUserProfile("15");
// getUserOrders("1");
// getOrdersByFilter("Delivered","2024-10-05","2024-10-10")
// listTables();
// updateItem();
// deleteItem("USER#1","ORDER#ORD017");
// scanOperation();
cursor();
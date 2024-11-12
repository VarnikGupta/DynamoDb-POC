const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "us-west-2",
  accessKeyId: "dummyAccessKeyId",
  secretAccessKey: "dummySecretAccessKey",
});

const documentClient = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:8000",
  region: "us-west-2",
  accessKeyId: "dummyAccessKeyId",
  secretAccessKey: "dummySecretAccessKey",
});

module.exports = { dynamoDB, documentClient };

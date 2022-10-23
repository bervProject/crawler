const {
  DynamoDBClient,
  BatchWriteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { dataToDynamoDb, paginate } = require("./mapper");

const client = new DynamoDBClient();

const tableName = process.env.DYNAMODB_TABLE_NAME;

const send = async (data = []) => {
  const dynamoDBData = data.map(dataToDynamoDb);
  const params = {
    RequestItems: {
      [tableName]: dynamoDBData,
    },
  };
  const command = new BatchWriteItemCommand(params);
  try {
    const results = await client.send(command);
    console.log(results.ConsumedCapacity);
    console.log(results.UnprocessedItems);
  } catch (err) {
    console.error(err);
  }
};

const store = async (data = []) => {
  const totalData = data.length;
  console.log(`Total data: ${totalData}`);
  const pageSize = 25;
  const page = Math.ceil(totalData / pageSize);
  console.log(`Total page: ${page}`);
  let currentPage = 0;
  while (currentPage < page) {
    console.log(`Page ${currentPage} of ${page}`);
    await send(paginate(data, pageSize, currentPage));
    currentPage += 1;
  }
};

module.exports = store;

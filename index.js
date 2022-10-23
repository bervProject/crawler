const axios = require("axios");
const { requestToData } = require("./mapper");
const saveToDynamoDb = require("./dynamodb-client");

const username = process.env.CREDLY_USERNAME;

async function credly() {
  const response = await axios.get(
    `https://www.credly.com/users/${username}/badges?sort=-state_updated_at`, {
      headers: {
        Accept: "application/json"
      }
    }
  );
  const list = response.data?.data || [];
  const dataMapped = list.map(requestToData);
  await saveToDynamoDb(dataMapped);
}

credly();

const requestToData = (element = {}) => {
  return {
    id: element.id,
    name: element["badge_template"]["name"],
    src: element["image_url"],
    provider: element["issuer"]["entities"][0]["entity"]["name"],
    expires: element["expires_at"]
  };
};

const dataToDynamoDb = (data = {}) => {
  const expires = data.expires ? ({expires: { S: data.expires }}) : {};
  return {
  PutRequest: {
    Item: {
      id: { S: data.id },
      name: { S: data.name },
      src: { S: data.src },
      provider: { S: data.provider },
      ...expires,
    },
  },
};
};

const paginate = (array, page_size, page_number) => {
  return array.slice(
    page_number * page_size,
    page_number * page_size + page_size
  );
};

module.exports = {
  requestToData,
  dataToDynamoDb,
  paginate,
};

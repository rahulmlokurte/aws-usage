exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  let response = {
    statusCode: 200,
    body: `Hello ${event.pathParameters.name}. Welcome to CDK!`,
  };
  return response;
};

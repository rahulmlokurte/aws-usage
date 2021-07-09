exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  let response = {
    statusCode: 200,
    body: `Hello ${event.path}. Welcome to CDK!`,
  };
  return response;
};

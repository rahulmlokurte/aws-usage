exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  var name = event.pathParameters.name
    ? event.pathParameters.name
    : event.pathParameters.proxy;
  let response = {
    statusCode: 200,
    body: `Hello ${name}. Welcome to CDK!`,
  };
  return response;
};

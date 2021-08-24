exports.handler = async function (event) {
  console.log("Request Recieved: ", JSON.stringify(event, undefined, 2));

  if (event.httpMethod === "POST") {
    let request = JSON.parse(event.body);
    let username = request.username;
    let department = request.department;
    let departmentName = department.departmentName;

    let user = { username: username, departmentName: departmentName };
    const response = {
      statusCode: 200,
      body: JSON.stringify(user),
    };
    return response;
  }

  if (event.httpMethod === "GET") {
    let response = {
      statusCode: 200,
      body: `Hello ${event.queryStringParameters.greetName}. Welcome to CDK`,
    };
    return response;
  }
};

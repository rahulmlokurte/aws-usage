const cdk = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const { JsonSchemaType } = require("@aws-cdk/aws-apigateway");

class CdkApigatewayStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const greet = new lambda.Function(this, "GreetHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "greet.handler",
      functionName: "greet",
    });

    const greetApi = new apigateway.LambdaRestApi(this, "GreetLambda", {
      handler: greet,
      proxy: false,
      restApiName: "greet-api",
    });

    const greetModel = new apigateway.Model(this, "model-validator", {
      restApi: greetApi,
      contentType: "application/json",
      description: "To validate the request body",
      modelName: "greetmodelcdk",
      schema: {
        type: JsonSchemaType.OBJECT,
        required: ["username"],
        properties: {
          username: { type: "string" },
          department: {
            type: "object",
            properties: {
              departmentName: { type: "string" },
            },
          },
        },
      },
    });

    const greetApiIntegration = new apigateway.LambdaIntegration(greet);
    const items = greetApi.root.addResource("greet");
    const users = greetApi.root.addResource("user");
    items.addMethod("GET", greetApiIntegration, {
      requestParameters: {
        "method.request.querystring.greetName": true,
      },
      requestValidatorOptions: {
        requestValidatorName: "querystring-validator",
        validateRequestParameters: true,
        validateRequestBody: false,
      },
    });
    users.addMethod("POST", greetApiIntegration, {
      requestValidator: new apigateway.RequestValidator(
        this,
        "body-validator",
        {
          restApi: greetApi,
          requestValidatorName: "body-validator",
          validateRequestBody: true,
        }
      ),
      requestModels: {
        "application/json": greetModel,
      },
    });
  }
}

module.exports = { CdkApigatewayStack };

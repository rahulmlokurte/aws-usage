const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const gateway = require("@aws-cdk/aws-apigateway");

class CdkGreetappStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    // defines an AWS Lambda resource
    const greet = new lambda.Function(this, "GreetHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "greet.handler",
    });

    // defines an AWS API Gateway resource With Proxy
    const apiGatewayWithProxy = new gateway.LambdaRestApi(
      this,
      "greetApiWithProxy",
      {
        handler: greet,
      }
    );

    // defines an AWS API Gateway resource Without Proxy
    const apiGatewayWithoutProxy = new gateway.LambdaRestApi(
      this,
      "greetApiWithoutProxy",
      {
        handler: greet,
        proxy: false,
      }
    );

    const greetResources = apiGatewayWithoutProxy.root.addResource("greet");
    const greetResource = greetResources.addResource("{name}");
    greetResource.addMethod("GET");
  }
}

module.exports = { CdkGreetappStack };

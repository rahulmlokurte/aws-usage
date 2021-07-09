const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");

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
  }
}

module.exports = { CdkGreetappStack };

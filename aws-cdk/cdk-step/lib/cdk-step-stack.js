const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const sfn = require("@aws-cdk/aws-stepfunctions");
const tasks = require("@aws-cdk/aws-stepfunctions-tasks");
const iam = require("@aws-cdk/aws-iam");

class CdkStepStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const helloFunction = new lambda.Function(this, "MyLambdaFunction", {
      functionName: "Hello-Function",
      code: lambda.Code.fromInline(`
          exports.handler = (event, context, callback) => {
              callback(null, "Hello World!");
          };
      `),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      timeout: cdk.Duration.seconds(25),
    });

    const definition = new tasks.LambdaInvoke(this, "MyLambdaTask", {
      lambdaFunction: helloFunction,
    }).next(new sfn.Succeed(this, "GreetedWorld"));

    const stateMachine = new sfn.StateMachine(this, "MyStateMachine", {
      stateMachineName: "Hello-World-Step",
      definition,
    });
  }
}
module.exports = { CdkStepStack };

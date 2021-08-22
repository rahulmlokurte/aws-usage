import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as subscription from '@aws-cdk/aws-sns-subscriptions';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkSnsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an SNS Topic
        const topic = new sns.Topic(this, 'notification', {
            topicName: 'notification-topic',
            displayName: 'notification-topic'
        })

        // Create an lambda function
        const notificationLambda = new lambda.Function(this, "notification-lambda", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "index.handler",
            functionName: "notification-lambda"
        });

        // subscribe an Lambda to SNS topic
        topic.addSubscription(new subscription.LambdaSubscription(notificationLambda));

        // output ARN
        new cdk.CfnOutput(this, 'snsTopicARN', {
            value: topic.topicArn,
            description: 'The SNS notification-topic ARN'
        })
    }
}

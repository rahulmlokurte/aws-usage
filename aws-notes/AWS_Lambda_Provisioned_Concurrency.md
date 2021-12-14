# How does AWS Lambda Provisioned Concurrency work

Serverless applications scales automatically, so how does AWS Lambda scales. Let us say, we have a lambda and it gets invoked. The container spins up, your code gets loaded and your code is run. The container creation and loading of your code is managed by AWS. The time it takes for container to come up and loading your code is known as _cold start_. It is basically the time between when you actually invoke the lambda and when the lambda actually starts running.

When the lambda function is called concurrently, the containers creation and loading of code has to be done concurrently. The two important things we need to know are:

- Limit of Scaling
- Rate of Scaling

Limit of Scaling is how many concurrent execution can a lambda execute.
Rate of Scaling is how fast the containers can come up.

There are two types of concurrency controls:

1. reserved concurrency
2. provisioned concurrency

## Reserved Concurrency

Reserved concurrency guarantees the maximum number of concurrent instances for the function. There is a _Unreserved account concurrency_ value which is the sum total number of concurrent executions for all the lambda function combined in an account.

## Provisioned Concurrency

Provisioned concurrency initializes a requested number of execution environments so that they are prepared to respond immediately to your function's invocations. Note that configuring provisioned concurrency incurs charges to your AWS account.

The provisioned concurrency number are the instances of your function that are always active. So there is no cold start as lambdas are already active.

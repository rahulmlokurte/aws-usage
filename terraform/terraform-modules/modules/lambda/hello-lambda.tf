resource "aws_lambda_function" "hello_lambda" {
  function_name    = "hello-lambda"
  handler          = "index.handler"
  runtime          = "nodejs14.x"
  source_code_hash = filebase64sha256("resources.zip")
  role             = var.aws_lambda_function_role_arn
}
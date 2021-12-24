module "profile_generator_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.7.0"
  # insert the 28 required variables here
  function_name = "profile-generator-lambda"
  description   = "Generates a new profiles"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  source_path   = "${path.module}/resources/profile-generator-lambda"
  layers        = [module.profile_generator_lambda_layer.lambda_layer_arn]
  environment_variables = {
    "mongoURI" = data.aws_secretsmanager_secret_version.secret_credentials.secret_string
  }

  tags = {
    Name = "profile-generator-lambda"
  }
}

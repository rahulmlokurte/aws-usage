module "profile_generator_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.7.0"
  # insert the 28 required variables here
  function_name = "profile-generator-lambda"
  description   = "Generates a new profiles"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  source_path   = "${path.module}/resources/profile-generator-lambda"

  tags = {
    Name = "profile-generator-lambda"
  }
}

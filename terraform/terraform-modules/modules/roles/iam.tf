resource "aws_iam_role" "lambda_role" {
  name               = "Hello-lambda-role"
  assume_role_policy = data.template_file.lambda_assume_role_policy.rendered
}
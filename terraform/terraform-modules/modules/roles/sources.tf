data "template_file" "lambda_assume_role_policy" {
  template = file("${path.module}/templates/lambda_assume_role_policy.json")
}
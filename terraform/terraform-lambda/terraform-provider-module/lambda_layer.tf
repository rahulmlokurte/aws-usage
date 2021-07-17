module "profile_generator_lambda_layer" {
  source = "terraform-aws-modules/lambda/aws"

  create_layer = true

  layer_name          = "profile-generator-layer"
  description         = "The Faker Dependency layer"
  compatible_runtimes = ["nodejs14.x", "nodejs12.x"]
  source_path         = "${path.module}/resources/profile-generator-layer"
}

data "aws_vpc_endpoint_service" "api-gateway-vpc-learning-endpoint-service" {
  service = "execute-api"
}

data "template_file" "role_policy" {
  template = file("${path.module}/templates/role_policy.json")
}
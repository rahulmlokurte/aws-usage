data "aws_vpc_endpoint_service" "api-gateway-vpc-learning-endpoint-service" {
  service = "execute-api"
}
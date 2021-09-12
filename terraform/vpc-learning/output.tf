output "api-gateway-url" {
  value = "https://${aws_api_gateway_rest_api.api-gateway-vpc-learning.id}-${aws_vpc.vpc-learning.id}.execute-api.${var.region}.amazonaws.com/${var.stage_name}"
}
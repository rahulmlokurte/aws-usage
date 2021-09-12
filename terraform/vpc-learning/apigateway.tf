resource "aws_api_gateway_rest_api" "api-gateway-vpc-learning" {
  name = "api-gateway-vpc-learning"
  endpoint_configuration {
    types = [
      "PRIVATE"]
    vpc_endpoint_ids = [
      aws_vpc_endpoint.api-gateway-vpc-learning-endpoint-service.id ]
  }
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "execute-api:Invoke",
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": "execute-api:Invoke",
            "Resource": [
                "*"
            ],
            "Condition" : {
                "StringNotEquals": {
                    "aws:SourceVpce": "${aws_vpc_endpoint.api-gateway-vpc-learning-endpoint-service.id}"
                }
            }
        }
    ]
}
EOF
}

resource "aws_api_gateway_resource" "api-gateway-vpc-learning-resources" {
  parent_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id
  path_part = "greet"
  rest_api_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id
}

resource "aws_api_gateway_method" "api-gateway-vpc-learning-method" {
  authorization = "NONE"
  http_method = "GET"
  resource_id = aws_api_gateway_resource.api-gateway-vpc-learning-resources.id
  rest_api_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id
}

resource "aws_api_gateway_integration" "api-gateway-vpc-learning-integration" {
  http_method = aws_api_gateway_method.api-gateway-vpc-learning-method.http_method
  resource_id = aws_api_gateway_resource.api-gateway-vpc-learning-resources.id
  rest_api_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id
  type = "MOCK"
}

resource "aws_api_gateway_deployment" "api-gateway-vpc-learning-deployment" {
  rest_api_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id

 lifecycle {
create_before_destroy = true
 }

  depends_on = [
  aws_api_gateway_rest_api.api-gateway-vpc-learning,
  aws_api_gateway_resource.api-gateway-vpc-learning-resources,
  aws_api_gateway_method.api-gateway-vpc-learning-method,
  aws_api_gateway_integration.api-gateway-vpc-learning-integration]
}

resource "aws_api_gateway_stage" "api-gateway-vpc-learning-stage" {
  deployment_id = aws_api_gateway_deployment.api-gateway-vpc-learning-deployment.id
  rest_api_id = aws_api_gateway_rest_api.api-gateway-vpc-learning.id
  stage_name = var.stage_name
}
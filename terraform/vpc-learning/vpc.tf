resource "aws_vpc" "vpc-learning" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "vpc-learning"
  }
}

resource "aws_subnet" "vpc-learning-public-subnet-1" {
  cidr_block              = "10.0.1.0/24"
  vpc_id                  = aws_vpc.vpc-learning.id
  map_public_ip_on_launch = true
  availability_zone       = "ap-south-1a"
}

resource "aws_internet_gateway" "vpc-learning-internet-gateway" {
  vpc_id = aws_vpc.vpc-learning.id
}

resource "aws_route_table" "vpc-learning-public-route-table" {
  vpc_id = aws_vpc.vpc-learning.id
}

resource "aws_route" "vpc-learning-public-route" {
  route_table_id         = aws_route_table.vpc-learning-public-route-table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.vpc-learning-internet-gateway.id
}

resource "aws_route_table_association" "vpc-learning-public-route-table-association" {
  route_table_id = aws_route_table.vpc-learning-public-route-table.id
  subnet_id      = aws_subnet.vpc-learning-public-subnet-1.id
}

resource "aws_security_group" "vpc-learning-security-group" {
  name   = "vpc-learning-default-security-group"
  vpc_id = aws_vpc.vpc-learning.id
  ingress {
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = [var.ingress_egress_cidr_blocks]
  }
  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = [var.ingress_egress_cidr_blocks]
  }

  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = [var.ingress_egress_cidr_blocks]
  }
}

resource "aws_vpc_endpoint" "api-gateway-vpc-learning-endpoint-service" {
  service_name       = data.aws_vpc_endpoint_service.api-gateway-vpc-learning-endpoint-service.service_name
  vpc_id             = aws_vpc.vpc-learning.id
  vpc_endpoint_type  = "Interface"
  subnet_ids         = [aws_subnet.vpc-learning-public-subnet-1.id]
  security_group_ids = [aws_security_group.vpc-learning-security-group.id]
}

resource "aws_codecommit_repository" "cicd_demo" {
  repository_name = var.repository_name
  description     = "An codecommit Repository for cicd-demo"
}

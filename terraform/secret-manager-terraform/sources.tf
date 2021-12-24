data "aws_secretsmanager_secret" "secret_name" {
  name = "mongodbURI"
}

data "aws_secretsmanager_secret_version" "secret_credentials" {
  secret_id = data.aws_secretsmanager_secret.secret_name.id
}
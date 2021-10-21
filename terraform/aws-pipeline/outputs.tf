output "code_commit_repository_id" {
  value = aws_codecommit_repository.cicd_demo.repository_id
}

output "code_commit_clone_url_http" {
  value = aws_codecommit_repository.cicd_demo.clone_url_http
}

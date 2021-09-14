variable "region" {
  description = "Deployment Region"
  default     = "ap-south-1"
}

variable "aws_profile" {
  description = "Given name in the credential file"
  type        = string
  default     = "rahul-admin"
}

variable "shared_credentials_file" {
  description = "Profile file with credentials to the AWS account"
  type        = string
  default     = "C:/Users/rahul.lokurte/.aws/credentials"
}

variable "tags" {
  description = "A map of tags to add to all resources."
  type        = map(string)
  default = {
    application = "Learning-Tutor"
    env         = "Test"
  }
}
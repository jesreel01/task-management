terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = "> 1.2.0"
}

provider "aws" {
  region = "ap-southeast-1"
  profile = "prac"
}

resource "aws_cognito_user_pool" "task_management" {
  name = "my-user-pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "task_managent" {
  name         = "my-user-pool-client"
  user_pool_id = aws_cognito_user_pool.task_management.id

  generate_secret = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}

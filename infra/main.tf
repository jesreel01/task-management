terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = "> 1.2.0"

  backend "s3" {
    bucket = "terraform-state-taskmanagement-254e456e"
    key    = "task-management/terraform.tfstate"
    region = "ap-southeast-1"
    profile = "prac"
    dynamodb_table = "terraform-state-lock-taskmanagement-254e456e"
  }
}

provider "aws" {
  region  = "ap-southeast-1"
  profile = "prac"
}

resource "aws_cognito_user_pool" "task_management" {
  name = "task-management-user-pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  mfa_configuration = "OFF"


}

resource "aws_cognito_user_pool_client" "task_management" {
  name         = "task-management-client"
  user_pool_id = aws_cognito_user_pool.task_management.id

  generate_secret = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}

output "user_pool_id" {
  value = aws_cognito_user_pool.task_management.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.task_management.id
}


# Task Management System

A full-stack task management application built with Next.js, FastAPI, and AWS Cognito.

## 📋 Overview

Task Management System is a modern web application that helps users organize and track their tasks efficiently. The project uses Next.js for the frontend, FastAPI for the backend, and AWS Cognito for authentication.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in with AWS Cognito
- **Task Organization**: Create, update, and delete tasks
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface built with TailwindCSS
- **Serverless Architecture**: Backend APIs deployed as serverless functions

## 🛠️ Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework
- [TailwindCSS 4](https://tailwindcss.com/) - CSS framework
- [React 19](https://react.dev/) - UI library
- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) - AWS services integration

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - SQL toolkit and ORM
- [AWS Cognito](https://aws.amazon.com/cognito/) - Authentication service

### Infrastructure
- [Terraform](https://www.terraform.io/) - Infrastructure as Code
- [AWS](https://aws.amazon.com/) - Cloud provider
- [Docker](https://www.docker.com/) - Containerization

## 🔧 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v18 or higher)
- Python 3.8+
- AWS account with configured credentials

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-management.git
   cd task-management
   ```

2. Set up AWS credentials
   ```bash
   aws configure
   ```

3. Create environment variables
   ```bash
   # Create .env file in client directory
   touch client/.env.local
   
   # Add the following variables
   COGNITO_CLIENT_ID=your_cognito_client_id
   COGNITO_USER_POOL_ID=your_cognito_user_pool_id
   AWS_REGION=your_aws_region
   ```

### Development

#### Using Docker Compose

Start the entire application:

```bash
docker compose up
```

The client will be available at [http://localhost:3000](http://localhost:3000) and the server at [http://localhost:8000](http://localhost:8000).

#### Running Individually

**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Backend:**
```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🏗️ Infrastructure

The project uses Terraform to provision AWS resources:

```bash
cd infra
terraform init
terraform apply
```

This will create:
- AWS Cognito User Pool
- Required IAM roles and policies
- S3 bucket for Terraform state (already configured)
- DynamoDB table for state locking

## 🧪 Testing

Run frontend tests:
```bash
cd client
npm test
```

Run backend tests:
```bash
cd server
pytest
```

## 📚 API Documentation

Once the server is running, FastAPI automatically generates API documentation available at:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

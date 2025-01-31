# DevOps Test

This repository contains a sample project to demonstrate DevOps practices using AWS CDK and a Django application.

## Capabilities

- **Django Application**: A simple Django application named `testapp`, located in the `src` folder.
- **AWS CDK Infrastructure**: Infrastructure as code using AWS CDK in the `infra` folder.
- **Development and Production Configurations**: Separate configurations for development and production environments located in the `docker` folder.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- AWS CLI
- AWS CDK

### Installation 

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/devops-test.git
  cd devops-test
  ```

#### Python TestApp 

1. Build the development server using the make command with Docker and Docker Compose:
  ```bash
  make build-development
  ```

2. Build the production server using the make command with Docker Compose:
  ```bash
  make build-production
  ```

#### CDK Infra

1. Install the required Node.js packages for CDK:
  ```bash
  cd infra
  npm install
  ```

2. Configure AWS secrets and bootstrap the project:
  ```bash
  export AWS_ACCESS_KEY_ID=***
  export AWS_SECRET_ACCESS_KEY=***
  cd infra
  cdk bootstrap
  ```

3. Run the provisioning:
  ```bash
  cd infra
  cdk deploy
  ```

## Building and Running the Project

## CDK Infrastructure

The `infra` folder contains the AWS CDK stack definitions for deploying the infrastructure required by the Django application.

### Deploying the Infrastructure

1. Bootstrap your AWS environment (only needed once per environment):
  ```bash
  cdk bootstrap
  ```

2. Deploy the CDK stack:
  ```bash
  cdk deploy
  ```

## Django Application

The `testapp` Django application is a simple web application that demonstrates basic Django functionality. It includes:

- Models
- Views
- Templates
- URL routing

### Running Tests

To run the tests for the Django application, use the following command:
  ```bash
  python manage.py test
  ```

## License

This project is licensed under the MIT License.
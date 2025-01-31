# OUTCOMES

## Summary

This document outlines the steps taken to create a CI/CD pipeline for a Django application using Docker, AWS CDK, and GitHub Actions. It includes containerizing the application, provisioning infrastructure, setting up CI/CD workflows, and suggestions for improvements.

## My Thoughts and Concerns

To achieve the goal of creating a CI/CD pipeline for a Django application using Docker, AWS CDK, and GitHub Actions, I followed a structured approach. This approach ensures that the infrastructure is provisioned automatically, the application is containerized, and the deployment process is fully automated.

### 1. Containerizing the Django Application

The first step was to containerize the Django application using Docker. This ensures that the application runs consistently across different environments. I created a Dockerfile that:

- Uses a `python:3.9-slim` base image for a lightweight environment.
- Sets up the necessary environment variables for development and production.
- Installs the application dependencies from `requirements.txt`.
- Exposes port 8000 for the Django application.
- Includes a `HEALTHCHECK` to monitor the application's health.

For development, I enhanced the Dockerfile to include debugging tools like `debugpy` and enabled auto-reloading using Django's `runserver` command.

**Extra Information**: I encountered an issue with CloudFormation getting stuck in the CREATE phase for the Service. Due to time constraints, I had to directly modify the source code to override the `ALLOWED_HOST` setting. This is not the best approach, but it was necessary to meet the deadline.

### 2. Provisioning Infrastructure with AWS CDK

Next, I used AWS CDK (Cloud Development Kit) for the first time to define the infrastructure as code. I had never experienced this tool before, and it was my first contact with this type of IaC. The infrastructure includes:

**Resources Created by `infra/lib/infra-stack.ts`**:

- Amazon Elastic Container Registry (ECR) repository
- Amazon Elastic Container Service (ECS) cluster
- ECS task definition
- ECS service
- Application Load Balancer (ALB)
- ALB target group
- ALB listener
- VPC (Virtual Private Cloud)
- Subnets
- Security groups
- IAM roles and policies

The AWS CDK stack was written in TypeScript, allowing me to define the infrastructure in a programmatic way. I firmly believe that it can have different ways to do that in a better and more reusable structure. The stack ensures that the ECR repository is created before the Docker image is pushed, and the ECS service is deployed after the image is available.

**Extra Information**: Also, the `ALLOWED_HOST` environment could be managed by the CDK project, but due to time constraints, I could not make it work.

**Additional Comments**: I encountered some CloudFormation errors or got stuck during the creation process. From my research, this seems to be a common issue that might need adjustments in the deployment process or how the components are created together. Unfortunately, I did not have enough time to troubleshoot it thoroughly.

### 3. Setting Up GitHub Actions for CI/CD

To automate the entire process, I set up a GitHub Actions workflow. The workflow is divided into two main jobs:

#### a. Provision Infrastructure

- This job uses AWS CDK to deploy the infrastructure stack.
- It ensures that the ECR repository and other necessary resources are created before proceeding to the next steps.
- The job runs only when changes are pushed to the main branch.

#### b. Build and Push Docker Image

- Once the infrastructure is provisioned, this job builds the Docker image for the Django application.
- It logs into Amazon ECR and pushes the Docker image to the repository.
- The image is tagged with `latest` for simplicity, but you can use more sophisticated tagging strategies (e.g., Git commit SHA).

Using `latest` as the image tag for this project, I did not have enough time to implement a Redeploy phase for the ECS, which may need to force deploy eventually.

### Best Scenario for Fully Automated Deployment

1. **Containerizing the Django Application**

    - Use a multi-stage Dockerfile to optimize the build process and reduce the final image size.
    - Implement a more sophisticated tagging strategy for Docker images, such as using Git commit SHAs or version numbers.

2. **Provisioning Infrastructure with AWS CDK**

    - Refactor the CDK stack to use reusable constructs and modules for better maintainability.
    - Implement environment-specific configurations (e.g., development, staging, production) using context variables or parameterized stacks.
    - Ensure that all environment variables, including `ALLOWED_HOSTS`, are managed securely using AWS Secrets Manager or SSM Parameter Store.

3. **Setting Up GitHub Actions for CI/CD**

    - Split the workflow into multiple jobs for better readability and maintainability.
    - Add a job to run unit tests and linting before building the Docker image.
    - Implement a deployment strategy for ECS, such as blue-green deployments or rolling updates, to minimize downtime and ensure zero-downtime deployments.
    - Add notifications for build and deployment status using GitHub Actions' built-in notifications or third-party integrations like Slack or email.

4. **Monitoring and Logging**

    - Set up monitoring and logging for the application using AWS CloudWatch, including custom metrics and alarms for critical events.
    - Implement centralized logging for the application and infrastructure using AWS CloudWatch Logs or a third-party logging service.

5. **Security and Compliance**

    - Ensure that all IAM roles and policies follow the principle of least privilege.
    - Regularly review and update security groups and network configurations to minimize exposure.
    - Implement automated security scans for Docker images and dependencies using tools like Trivy or Snyk.

By following these best practices, the deployment process can be fully automated, secure, and maintainable, ensuring a reliable and scalable infrastructure for the Django application.
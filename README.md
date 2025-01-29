# DevOps Test

This repository contains a sample project to demonstrate DevOps practices using AWS CDK and a Django application.

## Capabilities

- **Django Application**: A simple Django application named `testapp`.
- **AWS CDK Infrastructure**: Infrastructure as code using AWS CDK.
- **Development and Production Configurations**: Separate configurations for development and production environments.

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

2. Create a virtual environment and activate it:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows use `venv\Scripts\activate`
  ```

3. Install the required Python packages:
  ```bash
  pip install -r requirements.txt
  ```

4. Install the required Node.js packages for CDK:
  ```bash
  npm install
  ```

## Building and Running the Project

### Development Configuration

1. Apply migrations and start the Django development server:
  ```bash
  python manage.py migrate
  python manage.py runserver
  ```

2. Access the application at `http://127.0.0.1:8000`.

### Production Configuration

1. Set the `DJANGO_SETTINGS_MODULE` environment variable to `testapp.settings.production`:
  ```bash
  export DJANGO_SETTINGS_MODULE=testapp.settings.production
  ```

2. Apply migrations and start the Django server:
  ```bash
  python manage.py migrate
  python manage.py runserver 0.0.0.0:8000
  ```

3. Access the application at your server's IP address.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
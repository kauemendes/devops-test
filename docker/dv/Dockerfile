# Dockerfile
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBUG=1  # Enable Django debug mode
ENV DEVELOPMENT=1  # Custom flag for development-specific settings


# Set work directory
WORKDIR /app

# Install system dependencies (if needed for debugging tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  vim \
  net-tools \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install additional development tools (e.g., debugpy for VS Code debugging)
RUN pip install debugpy

# Copy project
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Health check to ensure the application is running
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8000/health/ || exit 1

# Command to run the application
CMD ["sh", "start.sh"]
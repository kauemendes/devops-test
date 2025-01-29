.PHONY: build-development
build-development: ## Build the development docker image.
	docker-compose -f docker/dv/compose.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker-compose -f docker/dv/compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker-compose -f docker/dv/compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker-compose -f docker/pr/compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker-compose -f docker/pr/compose.yml up -d

.PHONY: stop-pro	duction
stop-production: ## Stop the production docker container.
	docker-compose -f docker/pr/compose.yml down
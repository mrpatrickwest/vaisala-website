.PHONY: build

build: node_modules package.json
	node --harmony index.js local

production: node_modules package.json
	node --harmony index.js production

install:
	npm install

help:
	@echo "build - builds locally"
	@echo "dev - builds and pushes to dev-profile"
	@echo "dev-clear - clears the dev cache"
	@echo "qa - builds and pushes to qa-profile"
	@echo "prod - builds and pushes to production"

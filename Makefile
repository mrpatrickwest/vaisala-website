.PHONY: build

build: node_modules package.json
	node --harmony index.js local

production: node_modules package.json
	node --harmony index.js production

install:
	npm install

help:
	@echo "build - builds locally"
	@echo "prod - builds for production"

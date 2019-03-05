-include .env
export

vapid:
	./node_modules/.bin/web-push generate-vapid-keys

start:
	yarn start

default: env up start-frontend

env:
	rm -rf ./frontend/.env > /dev/null 2>&1
	rm -rf ./backend/.env > /dev/null 2>&1
	cp ./frontend/src/config/parameters/local.env ./frontend/.env
	cp ./backend/src/config/parameters/local.env ./backend/.env

up: down
	docker-compose -f docker-compose.yml up -d --remove-orphans

start-frontend:
	docker-compose -f docker-compose.yml exec frontend sh -c \
    	"yarn start"

down: timeout
	docker ps -a -q | xargs -n 1 -P 8 -I {} docker stop {}
	docker builder prune --all --force
	docker system prune -f

timeout:
	export DOCKER_CLIENT_TIMEOUT=2000
	export COMPOSE_HTTP_TIMEOUT=2000

kill:
	docker-compose -f docker-compose.yml exec -T frontend sh -c \
	"killall node > /dev/null 2>&1"

lint-frontend:
	docker-compose -f docker-compose.yml exec frontend sh -c \
 	 "yarn eslint && yarn stylelint && yarn prettier && yarn typescript && ANALYZE=true yarn build"

ssh-frontend: timeout
	docker-compose -f docker-compose.yml exec frontend sh

build: down timeout
	docker-compose -f docker-compose.yml build
	docker-compose up -d --remove-orphans
	make package-frontend
	make package-backend
	make down

package-frontend:
	docker-compose -f docker-compose.yml exec frontend sh -c \
	"yarn install"

owner:
	chown -R $$(whoami) .
	chmod -R 777 .

destroy: down
	docker volume prune -f
	docker image rm -f $(docker image ls -q)
	docker container rm -f $(docker container ls -qa)

log:
	docker-compose -f docker-compose.yml ps
	sleep 1
	docker-compose -f docker-compose.yml logs -f

serve:
	docker-compose -f docker-compose.yml exec frontend sh -c \
	"yarn serve"

bundle-frontend:
	docker-compose -f docker-compose.yml exec frontend sh -c \
	"yarn build"
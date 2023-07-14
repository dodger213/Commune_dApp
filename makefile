install:
	@npm install

run:
	@npm run start

build:
	@npm build start

bash-run:
	@bash ./localbuild.sh \
	"npm run start"

bash-build:
	@bash ./localbuild.sh "npm run build && npm run serve"

docker:
	@docker build -f Dockerfile -t frontend . && docker run -p 3000:3000 frontend 

rm-docker:
	docker image rm frontend
up:
	cd backend/ ; mvn package && cd ../frontend/ ; ng build && cd .. ; docker-compose up -d

down:
	docker-compose down

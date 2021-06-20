# Run the app v1
## Available Scripts

In the project directory, you can run:

### `docker-compose build`

Builds the docker container with needed tools, source and dependencies.

### `docker-compose up`

Runs the app in docker container
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to view it in the browser.

### `npm run test`

This will run the integration tests against running node and mysql. 
Note. Run the tests on clean database. 

### `docker-compose down`

To stop the containers.

# Run the app v2
If you face any problems with docker you can run the app without docker. 
Login in to your mysql 
  1. Create DATABASE
  2. Create USER and give PASSWORD
  3. Add these to src/app/config/db.config.ts file to the relevant keys
  4. Change the HOST to `localhost`
  5. Run the script `npm run dev`
  6. In the front-end side change API_URL in both auth.service.js and user.service.js to url API is running on. Usually `http://localhost:8080` 
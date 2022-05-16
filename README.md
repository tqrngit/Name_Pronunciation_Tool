# Name Pronunciation

This project designed to play pronunciation of employee using Google Cloud Platform(GCP)

## Getting Started

### Prerquisite

- GCP account
- Maven
- Spring boot with GCP integration (Back-end)
- React (front-end)

### Workspace

**WORKDIR**  will be referred as project root directory

| Directory | Description|
|-----------| --------|
| ./resources| Contains project level resources and database|
| ./src/main/java | Spring boot application contains Java file|
| ./src/main/resources | Spring boot application resources and gcp credentials|
| ./views | React - front end application |


### Run app

To run the application set the following environment variable and 
run the application

Back-end
````
# Set environment variables
export PROJECT_ID=wf-name-pronunciation-app
export GOOGLE_APPLICATION_CREDENTIALS=./src/main/resources/service_account_credentials.json

# Run Spring-boot app ** This will package front-end and back-end
mvn spring-boot:run

# in your browser use http://localhost:8080
````

Front-end

````
# Goto views directory and run the following command

# To install package
npm install

# To start application
npm start

# in your browser use http://localhost:3000

````

Deploy in cloud

````
gcloud run deploy --source . --project=wf-name-pronunciation-app
````
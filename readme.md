-run npm install

-create a postgresql database "LocalChampionship" 

-download PostgreSQL here: https://www.postgresql.org/download/

-run pgadmin4

-run sql query from 'model/database.sql'

-create .env file inside project:

    PG_USER="postgres" --->postgresql username
    PG_HOST="localhost"
    PG_DATABASE="LocalChampionship" ---> give this name to your database
    PG_PASSWORD="*******" ---> your postgresql password
    PG_PORT="5432"
    PORT="3000"
    SESSION_SECRET="PhenygCuhj3";
    SESSION_LIFETIME=1000*60*60*2;


// Populate database for testing
const insertData = false; // Set to true to populate the database
if (insertData) {
    populate.insertData();
}

-in the previous code of 'model/local-championship-model.mjs' set insertData = true;

-run node server.mjs

-close server with ctrl+c

-et insertData=false;

-run node server.mjs













run node server.mjs
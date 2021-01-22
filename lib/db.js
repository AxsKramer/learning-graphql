const {MongoClient} = require('mongodb');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

  const mongoURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

let connection;

async function connectDB(){
  if(connection) return connection;

  try {
    const client = await MongoClient.connect(mongoURL, {useNewUrlParser:  true, useUnifiedTopology: true, retryWrites: true,  w: 'majority'});
    connection = client.db(DB_NAME);
    return connection;
  } catch (error) {
    console.error('Could not connect to db', mongoURL, error);
    process.exit(1);
  }
}

module.exports = connectDB;

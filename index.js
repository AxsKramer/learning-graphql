const express = require('express');
const cors = require('cors');
const {readFileSync} = require('fs');
const path = require('path');
require('dotenv').config();
//gqlMiddleware
const {graphqlHTTP}  = require('express-graphql'); 
// const {buildSchema} = require('graphql');
const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./lib/resolvers');

const app = express();
const port = process.env.port;

const isDev = process.env.NODE_ENV !== 'production';

//definiendo el esquema
// const schema = buildSchema(readFileSync(path.join(__dirname, 'lib', 'schema.graphql'), 'utf-8'));
const typeDef = readFileSync(path.join(__dirname, 'lib', 'schema.graphql'), 'utf-8');
const schema = makeExecutableSchema({typeDefs: typeDef, resolvers});

app.use(cors());

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  //Para trabajar en entorno de desarrollo
  graphiql: isDev
}));

app.listen(port, () => console.log(`Server is running at http://localhost:${port}/api`));

//Ejecutar el query hello y saludo ***Uso en la terminal
// graphql(schema, '{hello, saludo}', resolvers).then(data => console.log(data));
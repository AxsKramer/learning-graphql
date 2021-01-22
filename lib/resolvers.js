const queries = require('./queries');
const mutations = require('./mutations');
const types = require('./types');

//Configurar los resolvers
const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types
}

module.exports = resolvers;
const connectDb = require('./db');
const { ObjectID} = require('mongodb');

module.exports = {
  Course: {
    people: async (args) => {
      try {
        const db = await connectDb();
        const ids = args.people ? args.people.map(id => ObjectID(id)) : [];
        const peopleData = ids.length > 0 
          ? await db.collection('students').find({_id: {$in: ids}}).toArray()
          : [];
        return peopleData;
      } catch (error) {
        console.log(error)
      }
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return 'Monitor'
      }
      return 'Student'
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return 'Course'
      }
      if (item.phone) {
        return 'Monitor'
      }
      return 'Student'
    }
  }
}
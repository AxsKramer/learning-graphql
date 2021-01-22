const connectDB = require('./db');
const {ObjectID} = require('mongodb');

module.exports = {
  
  createCourse: async (root, args) => {
    const {input} = args;
    try{
      const db = await connectDB();
      await db.collection('courses').insertOne(input);
      return input;
    }catch(error){
      console.error(error);
    }
  },
  createPerson: async (root, args) => {
    const {input} = args;
    try{
      const db = await connectDB();
      await db.collection('students').insertOne(input);
      return input;
    }catch(error){
      console.error(error);
    }
  },
  editCourse: async (root, args) => {
    const {_id, input} = args;
    try {
      const db = await connectDB();
      await db.collection('courses').updateOne({_id: ObjectID(_id)}, {$set: input});
      const course = await db.collection('courses').findOne({_id: ObjectID(_id)});
      return course;
    } catch (error) {
      console.log(error);
    }
  },
  editPerson: async (root, args) => {
    const {_id, input} = args;
    try {
      const db = await connectDB();
      await db.collection('students').updateOne({_id: ObjectID(_id)}, {$set: input});
      const student = await db.collection('students').findOne({_id: ObjectID(_id)});
      return student;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCourse: async (root, args) => {
    const {_id} = args;
    try{
      const db = await connectDB();
      const deleted = await db.collection('courses').deleteOne({_id: ObjectID(_id)});
      return deleted.deletedCount !== 0 ? `Curso con id ${_id} fue eliminado correctamente` : `No existe el curso con id ${_id}`; 
    }catch(error){
      console.error(error);
    }
  },
  deletePerson: async (root, args) => {
    const {_id} = args;
    try {
      const db = await connectDB()
      const deleted = await db.collection('students').deleteOne({_id: ObjectID(_id)});
      return deleted.deletedCount !== 0 ? `Estudiante con id ${_id} fue eliminado correctamente` : `No existe el estudiante con id ${_id}`; 
    } catch (error) {
      console.log(error);
    }
  },
  addPeopleToCourse: async (root, args) => {
    const {courseID, personID} = args;
    try {
      const db = await connectDB();
      const person = await db.collection('students').findOne({_id: ObjectID(personID)});
      const course = await db.collection('courses').findOne({_id: ObjectID(courseID)});
      if(!course || !person) throw new Error('La persona o el curso no existe');

      await db.collection('courses').updateOne(
        {_id: ObjectID(courseID)}, 
        {$addToSet: {people: ObjectID(personID)}}
      );

      return course;

    } catch (error) {
      console.log(error);
    }
  }
}
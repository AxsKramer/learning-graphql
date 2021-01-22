const connectDB = require('./db');
const {ObjectID} = require('mongodb');

module.exports = {
  getCourses: async () => {
    try {
      const db = await connectDB();
      const courses = await db.collection('courses').find().toArray();
      return courses;
    } catch (error) {
      console.error(error)
    }
  },
  getCourse: async (root, args) => {
    try{
      const db = await connectDB();
      const course = await db.collection('courses').findOne({_id: ObjectID(args.id)});
      return course;
    } catch(error){
      console.error(error);
    }
  },
  getPeople: async () => {
    try {
      const db = await connectDB();
      const students = await db.collection('students').find({}).toArray();
      return students;
    } catch (error) {
      console.error(error)
    }
  },
  getPerson: async (root, args) => {
    try{
      const db = await connectDB();
      const student = await db.collection('students').findOne({_id: ObjectID(args.id)});
      return student;
    } catch(error){
      console.error(error);
    }
  },
  searchItems: async (root, args) => {
    const {keyword} = args;
    try{
      const db = connectDB();
      const courses = await db.collection('courses').find({$text: {$search: keyword}}).toArray();
      const people = await db.collection('students').find({$text: {$search: keyword}}).toArray();
      const items = [...courses, ...people];
      return items;
    }catch(error){
      console.log(error);
    }
  }
}
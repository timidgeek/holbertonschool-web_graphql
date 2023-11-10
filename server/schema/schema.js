// schema file
// add GraphQLObjectType object using the object destructuring syntax
// import required components from graphql library
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema
 } = require('graphql');

// create a new GraphQLObjectType: TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {  
    id: { type: GraphQLString },  
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
}
});

// exports
module.exports = TaskType;
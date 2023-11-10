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

// create a new GraphQLObjectType: RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {id: { type: GraphQLString }}, // finds task in GraphQL server
      resolve(parent, args){
        // code to get data from db / other source
        // return task for testing purposes
        return TaskType.findById(args.id);
      }
    },
  }
});

// exports
module.exports = new GraphQLSchema({
  query: RootQuery
});

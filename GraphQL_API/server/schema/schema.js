// schema file

// require the lodash module
const _ = require('lodash');

// import required components from graphql library
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema
 } = require('graphql');

 // tasks array with task data
 const tasks = [
  {
    id: "1", 
    title: 'Create your first webpage', 
    weight: 1, 
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
  },
  {
    id: "2", 
    title: 'Structure your webpage', 
    weight: 1, 
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
  }
]


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
        // use lodash's  `find` function to get tasks by id
        return _.find(tasks, { id: args.id });
      }
    },
  }
});

// exports
module.exports = new GraphQLSchema({
  query: RootQuery
});

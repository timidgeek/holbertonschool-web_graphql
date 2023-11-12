// schema file

// require the lodash module
const _ = require('lodash');

// import required components from graphql library
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList
 } = require('graphql');

 // tasks array with task data
 const tasks = [
  {
    id: "1",
    projectId: "1",
    title: 'Create your first webpage', 
    weight: 1, 
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
  },
  {
    id: "2",
    projectId: "1",
    title: 'Structure your webpage', 
    weight: 1, 
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
  }
]

 // projects array with projects data
 const projects = [
  {
    id: "1", 
    title: 'Advanced HTML', 
    weight: 1, 
    description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!',
  },
  {
    id: "2", 
    title: 'Bootstrap', 
    weight: 1, 
    description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'
  }
]

// create a new GraphQLObjectType: TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({  
    id: { type: GraphQLID },  
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: { 
      type: ProjectType,
      resolve(parent, args){
        return _.find(projects, { id: parent.projectId });
      }},
  }),
});

// create a new GraphQLObjectType: ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },  
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args){
        return _.filter(tasks, { projectId: parent.id})
      }
    }
  })
});

// create a new GraphQLObjectType: RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {id: { type: GraphQLID }}, // finds task in GraphQL server
      resolve(parent, args){
        // code to get data from db / other source
        // use lodash's  `find` function to get tasks by id
        return _.find(tasks, { id: args.id });
      }
    },
    project: {
      type: ProjectType,
      args: {id: { type: GraphQLID }}, // finds task in GraphQL server
      resolve(parent, args){
        // code to get data from db / other source
        // use lodash's  `find` function to get tasks by id
        return _.find(projects, { id: args.id });
      }
    },
  }
});

// exports
module.exports = new GraphQLSchema({
  query: RootQuery
});

// schema file

// import project model from mongoose 
const ProjectModel = require('../models/project');

// import task model from mongoose 
const TaskModel = require('../models/task');

// require the lodash module
const _ = require('lodash');

// import required components from graphql library
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
 } = require('graphql');

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
        return ProjectModel.findById(parent.projectId);
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
        return TaskModel.find({ projectId: parent.id});
      }
    }
  })
});

// create a new GraphQLObjectType Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args){
        // create new Project Model
        const newProject = new ProjectModel({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return newProject.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args){
        // create new Task Model
        const newTask = new TaskModel({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        return newTask.save();
      },
    },
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
        return TaskModel.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: {id: { type: GraphQLID }}, // finds task in GraphQL server
      resolve(parent, args){
        // code to get data from db / other source
        // use lodash's  `find` function to get tasks by id
        return ProjectModel.findById(args.id);
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(){
        return TaskModel.find({});
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(){
        return ProjectModel.find({});
      }
    },
  }
});

// exports
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

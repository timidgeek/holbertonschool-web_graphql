import { gql } from 'apollo-boost';

// create getProjectsQuery gql
const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

// create getTasksQuery gql
const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

export {
  getTasksQuery,
  getProjectsQuery
};
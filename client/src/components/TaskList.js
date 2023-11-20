// components
import { useState } from "react";
import TaskDetails from './TaskDetails';
import { graphql } from 'react-apollo';
import { getTasksQuery } from "../queries/queries";

// bind the query to the component 
// to allow access to the data that comes from the query
function TaskList(props) {
  // eslint-disable-next-line
  const [state, setState] = useState({
    selected: null
  });
  // given func displayTasks
function displayTasks() {
  console.log(props.data);
  const data = props.data;

  if (data.loading) {
    return ( <div> Loading tasks... </div>);
    }
    else {
      return data.tasks.map(task => {
          return ( <li key = {
              task.id
            }
            onClick = {
              (e) => {
                setState({
                  selected: task.id
                });
              }
            } > {
              task.title
            } </li>);
          })
      }
   };

  console.log(props);
  return ( 
    <div>
      <ul id = "task-list">
        { displayTasks() }
      </ul>
      <TaskDetails/> 
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);
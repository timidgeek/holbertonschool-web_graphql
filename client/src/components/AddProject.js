import { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getProjectsQuery, addProjectMutation } from "../queries/queries";


function AddProject(props) {

  const [inputsProject, setInputsProject] = useState({
    title: '',
    weight: 1,
    description: ''

  });

  const handleChange = (e) => {
    const newInputsProject = {
      ...inputsProject
    };
    if (e.target.name === "weight") newInputsProject[e.target.name] = parseInt(e.target.value)
    else newInputsProject[e.target.name] = e.target.value
    setInputsProject(newInputsProject)
  }

  const submitForm = (e) => {
    e.preventDefault();
    props.addProjectMutation({
      variables: {
        title: inputsProject.title,
        weight: inputsProject.weight,
        description: inputsProject.description
      },
      refetchQueries: [{ query: getProjectsQuery }]
    });
  }

  return ( 
    <form 
      class = "project"
      id = "add-project"
      onSubmit = {submitForm}>
      <div className = "field">
        <label> Project title: </label> 
        <input type = "text"
        name = "title"
        onChange = {
          handleChange
        }
        value = {
          inputsProject.title
        }/>
      </div>
      <div className = "field">
        <label>Weight:</label>
        <input
          type = "number"
          name = "weight"
          onChange = {
            handleChange
          }
          value = {
            inputsProject.weight
          }
        required />
      </div>
      <div className = "field">
        <label> description: </label>
        <textarea 
        name = "description"
        onChange = {
          handleChange
        }
        value = {
          inputsProject.description
        }/>
      </div>
      <button> + </button> 
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addProjectMutation, { name: "addProjectMutation" }),
  )(AddProject);

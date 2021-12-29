import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get("//localhost:5000/exercises/")
      .then((response) => {
        this.setState({
          exercises: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios
      .delete("//localhost:5000/exercises/" + id)
      .then((response) => console.log(response.data));

    this.setState({
      exercises: this.state.exercises.filter((element) => element._id !== id),
    });
  }

  render() {
    return (
      <>
        <h3>Logged Exercises</h3>
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((currentExercise) => {
              return (
                <Exercise
                  exercise={currentExercise}
                  deleteExercise={this.deleteExercise}
                  key={currentExercise._id}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ExercisesList;

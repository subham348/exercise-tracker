import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";

function EditExercise(props) {
  const params = useParams();
  console.log(params);
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("//localhost:5000/exercises/" + params.id)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        }));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("//localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setState((prevState) => ({
            ...prevState,
            users: response.data.map((user) => user.username),
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onChangeUsername(e) {
    setState((prevState) => ({
      ...prevState,
      username: e.target.value,
    }));
  }

  function onChangeDescription(e) {
    setState((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  }

  function onChangeDuration(e) {
    setState((prevState) => ({
      ...prevState,
      duration: e.target.value,
    }));
  }

  function onChangeDate(date) {
    setState((prevState) => ({
      ...prevState,
      date: date,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    console.log(exercise);

    axios
      .post("//localhost:5000/exercises/update/" + params.id, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  console.log(state);

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;

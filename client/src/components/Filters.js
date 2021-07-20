import React, { useState } from "react";
import "../styles/filters.css";
import { AiFillCaretDown } from "react-icons/ai";
import { filterData } from "../utils/filterData";
import Modal from "../components/Modal";
import { useMutation } from "@apollo/client";
import { ADD_TODO } from "../Graphql/todoQueries";
import { valid } from "../utils/Invalid";

export const Filters = () => {
  const initState = {
    taskTitle: "",
    createdBy: "",
    assignedTo: "",
    status: "",
  };

  const [taskData, setTaskData] = useState(initState);
  const [err, setErr] = useState();
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState();
  const [filter, setFilter] = useState({
    search: "",
    createdBy: "",
    assignTo: "",
    status: "",
    createdOn: "",
  });

  const { taskTitle, createdBy, assignedTo, status } = taskData;

  const { search } = filter;

  const [addTodo, { loading, error, data }] = useMutation(ADD_TODO, {
    variables: {
      taskTitle: taskTitle,
      createdBy: createdBy,
      assignedTo: assignedTo,
      status: status,
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTaskData({ ...taskData, [id]: value });
  };

  const handleClick = (idx) => {
    if (clicked === idx) {
      return setClicked("0");
    }
    setClicked(idx);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();

    const validData = valid(taskTitle, createdBy, assignedTo, status);

    if (validData !== true) {
      console.log("here");
      return setErr(valid);
    }
    addTodo();
    if (!loading && error) {
      return setErr("Duplicate or improper Data");
    } else if (!loading && data?.createTodo) {
      setActive(!active);
      setTaskData(initState);
      setErr();
      return;
    } else {
      console.log("here4");
      setErr("Unknown Error");
    }
  };

  return (
    <>
      <Modal active={active}>
        <form onSubmit={addTaskHandler}>
          <div className="form-elements">
            <label htmlFor="taskTitle">Title</label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-elements">
            <label htmlFor="createdBy">Created By</label>
            <input
              type="text"
              id="createdBy"
              value={createdBy}
              onChange={handleChange}
            />
          </div>
          <div className="form-elements">
            <label htmlFor="assignedTo">Assign To</label>
            <input
              type="text"
              id="assignedTo"
              value={assignedTo}
              onChange={handleChange}
            />
          </div>
          <div className="form-elements">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={handleChange}
            />
          </div>
          {err && <div className="err">{err}</div>}
          <button type="submit">Add Todo</button>
        </form>
      </Modal>
      <div className="filters-wrap">
        <div className="filters">
          <div className="search">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              placeholder="Search Task Here"
              name="search"
              id="search"
              value={search}
              onChange={({ target }) =>
                setFilter({ ...filter, [target.id]: [target.value] })
              }
            />
          </div>

          {filterData.map(({ id, title, options }, idx) => (
            <div className="filter" key={id} onClick={() => handleClick(idx)}>
              {title} <AiFillCaretDown />
              <div className={`filter-drop ${clicked === idx ? "active" : ""}`}>
                {options.map((option) => (
                  <p key={option}>{option}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="btn" onClick={() => setActive(!active)}>
          Add task
        </div>
      </div>
    </>
  );
};

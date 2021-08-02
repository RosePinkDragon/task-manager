import React, { useEffect, useState } from "react";
import "../styles/filters.css";
import { AiFillCaretDown } from "react-icons/ai";
import { filterData } from "../utils/filterData";
import Modal from "../components/Modal";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, GET_TODOS, GET_USERS } from "../Graphql/todoQueries";
import { TodosVar } from "../Apollo/cache";

export const Filters = () => {
  // ?? for initial state for adding task
  const initState_addTask = {
    taskTitle: "",
    createdBy: "",
    assignedTo: "",
    status: "Created",
  };

  const [taskData, setTaskData] = useState(initState_addTask);
  const [err, setErr] = useState();
  const [activeDrop, setActiveDrop] = useState(0);
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState();
  const [filter, setFilter] = useState({
    search: "",
    createdBy: "",
    assignTo: "",
    status: "",
  });

  const {
    loading: loading_todos,
    error: error_todos,
    data: data__todos,
    refetch,
  } = useQuery(GET_TODOS, {
    variables: { filterTitle: "%", sortBy: "" },
    onCompleted({ getTodo }) {
      TodosVar(getTodo.todo);
    },
  });

  const { taskTitle, createdBy, assignedTo, status } = taskData;

  const { search } = filter;

  const {
    loading: user_loading,
    error: user_error,
    data: user_data,
  } = useQuery(GET_USERS);

  const [addTodo, { loading, error, data }] = useMutation(ADD_TODO, {
    variables: {
      taskTitle,
      createdBy,
      assignedTo,
      status,
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    if (!loading && error) {
      return setErr(error.message);
    }
  }, [error, loading]);

  useEffect(() => {
    if (!loading && data) {
      setErr("");
      setActive(!active);
    }
  }, [loading, data]);

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

  const handleActiveDrop = (idx) => {
    console.log("here");
    if (activeDrop === idx) {
      return setActiveDrop("0");
    }
    setActiveDrop(idx);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    setErr();
    addTodo();
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
              value={"Current User"}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="form-elements">
            <label htmlFor="assignedTo">Assign To</label>
            <div className="labelStyle" onClick={() => handleActiveDrop(1)}>
              {assignedTo}
            </div>
            {!user_loading ? (
              user_error ? (
                <p>Error Fetching users: {user_error.message}</p>
              ) : (
                <div
                  className={`selectDropdown ${
                    activeDrop === 1 ? "active" : ""
                  }`}
                >
                  {user_data.getUsers.map((data, idx) => (
                    <p
                      key={idx}
                      onClick={() => {
                        handleActiveDrop(1);
                        setTaskData({
                          ...taskData,
                          assignedTo: data.name,
                        });
                      }}
                    >
                      {data.name}
                    </p>
                  ))}
                </div>
              )
            ) : (
              <p>Loading Users</p>
            )}
          </div>
          <div className="form-elements">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="createdBy"
              value={status}
              onChange={handleChange}
              disabled={true}
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
            <div
              className="filter"
              key={id}
              onMouseEnter={() => handleClick(idx)}
              onMouseLeave={() => handleClick(idx)}
            >
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

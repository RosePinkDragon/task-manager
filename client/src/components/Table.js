import React, { useState } from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO } from "../Graphql/todoQueries";
import "../styles/table.css";
import { AiFillCaretDown } from "react-icons/ai";
import { TodosVar } from "../Apollo/cache";
import Pagination from "./Pagination";

const Table = () => {
  const [activeDrop, setActiveDrop] = useState("0");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState({
    sortBy: "id",
    order: "ASC",
  });

  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    variables: {
      filterTitle: "%",
      sortBy: sortBy.sortBy,
      order: sortBy.order,
      offset: page === 1 ? 0 : (page - 1) * 10,
      limit: 10,
    },
    onCompleted({ getTodo }) {
      TodosVar(getTodo.todo);
      console.log(data.getTodo);
    },
  });
  const [
    updateStatus,
    { loading: update_loading, data: update_data, error: update_error },
  ] = useMutation(UPDATE_TODO, {
    onCompleted(update_data) {
      const getTodo = update_data.getTodo;
      TodosVar({ ...getTodo.todo });
    },
  });
  const todo = useReactiveVar(TodosVar);

  const statStyle = (style) => {
    //?? This function styles the current stat of task status
    if (style === "Created") return "created";
    if (style === "Ongoing") return "pending";
    if (style === "Completed") return "completed";
  };

  const handleDrop = (idx) => {
    if (activeDrop === idx) {
      return setActiveDrop("0");
    }
    setActiveDrop(idx);
  };

  const handleChange = (id, idx, status) => {
    updateStatus({
      variables: { id: id, status: status },
    });

    handleDrop(idx);
    // create a toast to handle this
    if (!update_loading && update_error) {
      console.log(update_error);
    }
    if (!update_loading && update_data) {
      console.log(update_data);
      refetch();
      TodosVar();
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Task ID</th>
            <th>Task Title</th>
            <th>Created By</th>
            <th>Assign To</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {!loading && !error ? (
            todo.map((data, idx) => (
              <tr key={data.id}>
                <td>{idx + 1}</td>
                <td>{data.id}</td>
                <td className="title">{data.taskTitle}</td>
                <td>{data.createdBy}</td>
                <td>{data.assignedTo}</td>
                <td className="status-data">
                  <div
                    className={`status status-${statStyle(data.status)}`}
                    onMouseEnter={() => handleDrop(idx)}
                    onMouseLeave={() => setActiveDrop("0")}
                  >
                    {data.status} <AiFillCaretDown />
                    <ol
                      className={`dropdown ${
                        activeDrop === idx ? "active" : ""
                      }`}
                    >
                      <li onClick={() => handleChange(data.id, idx, "Ongoing")}>
                        Ongoing
                      </li>
                      <li
                        onClick={() => handleChange(data.id, idx, "Completed")}
                      >
                        Completed
                      </li>
                    </ol>
                  </div>
                </td>
                <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                <td>{new Date(data.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <p style={{ margin: "10px" }}>Loading..</p>
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} count={data?.getTodo.count} />
    </>
  );
};

export default Table;

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../Graphql/todoQueries";
import "../styles/table.css";

const Table = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const { getTodo } = !loading && data;

  const statStyle = (style) => {
    if (style === "Created") return "created";
    if (style === "Ongoing") return "pending";
    if (style === "Completed") return "completed";
  };

  return (
    <table>
      <thead>
        <tr>
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
          getTodo.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td className="title">{data.taskTitle}</td>
              <td>{data.createdBy}</td>
              <td>{data.assignedTo}</td>
              <td>
                <p className={`status status-${statStyle(data.status)}`}>
                  {data.status}
                </p>
              </td>
              <td>{new Date(data.createdAt).toLocaleDateString()}</td>
              <td>{new Date(data.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </tbody>
    </table>
  );
};

export default Table;

import React, { useState } from "react";
import { Filters } from "../components/Filters";
import Table from "../components/Table";
import logo from "../images/logo.png";
import userLogo from "../images/userLogo.png";
import "../styles/burger.css";
import "../styles/todos.css";

const Todos = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="wrap">
      <div className="header-wrap">
        <img src={logo} alt="" />
        <div>
          <img src={userLogo} alt="user" className="user-img" />
          <div
            onClick={() => setActive(!active)}
            className={`burger-btn ${active ? "active" : ""}`}
          />
        </div>
      </div>
      <div className="body todo">
        <Filters active={active} />
        <Table />
      </div>
    </div>
  );
};

export default Todos;

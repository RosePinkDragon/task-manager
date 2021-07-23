// import {  } from "@apollo/client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Filters } from "../components/Filters";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import logo from "../images/logo.png";
import userLogo from "../images/userLogo.png";
import "../styles/burger.css";
import "../styles/todos.css";

const Todos = () => {
  const history = useHistory();

  const [active, setActive] = useState(false);
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    if (!Cookies.get("authToken")) {
      history.push("/");
    } else {
      setCheckUser(false);
    }
  }, [history]);

  if (checkUser) return <p>Loading...</p>;
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
        <Pagination />
      </div>
    </div>
  );
};

export default Todos;

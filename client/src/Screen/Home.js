import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isEmail } from "validator";
import Modal from "../components/Modal";
import todo from "../images/todo.svg";
import logo from "../images/logo.png";
import "../styles/form.css";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../Graphql/todoQueries";

const Home = () => {
  const history = useHistory();

  const initData = {
    email: "",
    password: "",
  };

  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState(initData);
  const [err, setErr] = useState();
  const { email, password } = formData;

  const changeHandler = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const [loadUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    variables: { email: email, password: password },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setErr();
    if (!isEmail(email)) {
      return setErr("Invalid Email");
    }
    if (!email || !password) {
      return setErr("Please Enter Correct Data");
    }

    loadUser();
    if (!loading && error) {
      setErr("Invalid User Details");
    }

    if (!loading && data.loginUser) {
      history.push("/todos");
    }
  };

  return (
    <div className="wrap">
      <div className="header-wrap">
        <img src={logo} alt="" />
        <button onClick={() => setActive(!active)}>Login</button>
      </div>
      <Modal active={active}>
        <form onSubmit={submitHandler}>
          <div className="form-elements">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formData.id}
              onChange={changeHandler}
            />
          </div>
          <div className="form-elements">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.id}
              onChange={changeHandler}
            />
          </div>
          {err && <div className="err">{err}</div>}
          <button type="submit">Login</button>
        </form>
      </Modal>
      <div className="home body">
        <img src={todo} alt="todo here" />
        <div>
          <h1>Your TODO's</h1>
          <h3>Our Security</h3>
          <br />
          <p>
            Make your todo list with our Security. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Sunt quo aliquam minus ex illo
            delectus totam dolores numquam itaque, non iure perferendis
            dignissimos repellendus ad eius omnis ea, optio corporis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

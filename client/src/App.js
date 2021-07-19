import "./styles/index.css";
import Home from "./Screen/Home";
import Todos from "./Screen/Todos";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todos" exact component={Todos} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./List";
import ListItem from "./ListItem";

export default function App() {
  return (
    <Router>
      <div className="App">
        <h1>List Item</h1>
      </div>
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route exact path="/list-item/:id">
          <ListItem />
        </Route>
      </Switch>
    </Router>
  );
}

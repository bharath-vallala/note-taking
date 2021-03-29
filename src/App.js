import logo from './logo.svg';
import './App.css';
import {useDispatch,useSelector} from "react-redux"
import {decac,incac} from "./redux/actions"
import Home from "./pages/home.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddNotes from "./pages/AddNotes"



function App() {
  let dispatch=useDispatch()
  let counter=useSelector(state=>state.counter)
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          
          <Route path="/addnotes" exact component={AddNotes}></Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;

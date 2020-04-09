import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import Quiz from "./components/Quiz"
import CardList from "./components/CardList"

function App() {
  return (
    <div>    
      <NavigationBar/>

      <Router>
        <Route path="/quiz" component={Quiz}/>
        <Route path="/collection" component={CardList}/>
      </Router>
    </div>
  );
}

export default App;

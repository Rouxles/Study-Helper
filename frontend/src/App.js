import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from "react-bootstrap";
import CardList from "./components/CardList"
import Quiz from "./components/Quiz"

function App() {
  return (
    <div>    
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Study Helper</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="quiz">Quiz</Nav.Link>
                <Nav.Link href="collection">Flashcard Collection</Nav.Link>
                <Nav.Link href="source">Flashcard Source</Nav.Link>
                <Nav.Link>Flashcard Statistics</Nav.Link>
            </Nav>
      </Navbar>

    <Router>
      <Route path="/quiz" component={Quiz}/>
    </Router>
  </div>
  );
}

export default App;

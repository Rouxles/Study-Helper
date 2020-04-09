import React from 'react';
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
                <Nav.Link>Quiz Mode</Nav.Link>
                <Nav.Link>Flashcard Collection</Nav.Link>
                <Nav.Link>Flashcard Source</Nav.Link>
                <Nav.Link>Flashcard Statistics</Nav.Link>
            </Nav>
        </Navbar>
        <Quiz/>
    </div>
  );
}

export default App;

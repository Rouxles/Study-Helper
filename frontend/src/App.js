import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap'


function App() {
  return (
    <Card style={{ width: '50rem', margin: 'auto', marginTop: '2rem'}}>
      <Card.Body>
        <Card.Title>Topic</Card.Title>
        <Card.Text>
          Question
        </Card.Text>
        <Card.Link href="#">Flip</Card.Link>
      </Card.Body>
      <Card.Footer className="text-muted">Large topic > Sub topic > Cur topic</Card.Footer>
    </Card>
  );
}

export default App;

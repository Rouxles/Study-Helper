import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";

const API_URL = "http://0.0.0.0:8000"

export default class CardSource extends React.Component {
    render() {
        return (
            <Form style={{width: "80vw", margin: "auto", marginTop: "1vh"}}>
                <h5>Generate New Flashcards</h5>
                <Form.Group controlId="documentSource">
                    <Form.Label>Document Source</Form.Label>
                    <Form.Control type="text" placeholder="Enter document ID"/>
                    <Form.Text className="text-muted">
                        https://docs.google.com/document/d/{"<"}Use this ID{">"}/edit
                    </Form.Text>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";

const API_URL = "http://0.0.0.0:8000"

export default class CardSource extends React.Component {
    saveSource(e) {
        e.preventDefault();
        const sourceInput = document.getElementById("source-input").value;
        
        let sessionData = JSON.parse(localStorage.getItem("studyHelper"));
        if (!sessionData) {
            sessionData = {sources: [sourceInput]};
        } else {
            sessionData.sources.push(sourceInput);
        }

        localStorage.setItem("studyHelper", JSON.stringify(sessionData));
    }

    render() {
        return (
            <Form style={{width: "80vw", margin: "auto", marginTop: "1vh"}}>
                <h5>Generate New Flashcards</h5>
                <Form.Group controlId="documentSource">
                    <Form.Label>Document Source</Form.Label>
                    <Form.Control type="text" id="source-input" placeholder="Enter document ID"/>
                    <Form.Text className="text-muted">
                        https://docs.google.com/document/d/{"<"}Use this ID{">"}/edit
                    </Form.Text>
                    <Button variant="primary" type="submit" onClick={this.saveSource}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}
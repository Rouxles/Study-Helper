import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Table} from "react-bootstrap";

const API_URL = "http://0.0.0.0:8000"

export default class CardSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: []
        }

        this.saveSource = this.saveSource.bind(this);
    }

    getSources() {
        const sessionData = JSON.parse(localStorage.getItem("studyHelper"));
        if (sessionData) {
            this.setState({sources: sessionData.sources});
        }
    }

    saveSource(e) {
        e.preventDefault();
        const sourceInput = document.getElementById("source-input").value;
        
        let sessionData = JSON.parse(localStorage.getItem("studyHelper"));
        if (!sessionData) {
            sessionData = {sources: [{id: sourceInput, tile: "test"}]};
        } else {
            sessionData.sources.push({id: sourceInput, tile: "test"});
        }

        localStorage.setItem("studyHelper", JSON.stringify(sessionData));
        this.setState({sources: sessionData.sources});
    }

    componentDidMount() {
        this.getSources();
    }

    render() {
        console.log(this.state.sources)
        return (
            <div style={{width: "80vw", margin: "auto"}}>
                <h5 style={{marginTop: "1vh"}}>Generate New Flashcards</h5>
                <Form style={{marginTop: "1vh"}}>
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
                <h5 style={{marginTop: "1vh"}}>Current Document Sources</h5>
                <Table striped bordered hover style={{marginTop: "1vh"}}>
                    <thead>
                        <tr>
                            <th>Document ID</th>
                            <th>Document Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sources.map(source => (
                            <tr>
                                <td>{source.id}</td>
                                <td>{source.title}</td>
                            </tr>   
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
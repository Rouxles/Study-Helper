import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Table} from "react-bootstrap";
import CardList from "./CardList";

const API_URL = "http://0.0.0.0:8000"

export default class CardSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            showCardList: false
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
            sessionData = {sources: [{id: sourceInput, title: null}]};
        } else {
            sessionData.sources.push({id: sourceInput, title: null});
        }

        localStorage.setItem("studyHelper", JSON.stringify(sessionData));
        this.getDocumentTitles()
    }

    getDocumentTitles() {
        const data = JSON.parse(localStorage.getItem("studyHelper"));
        const documentSources = JSON.stringify({data: data.sources});
        const parameters = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: documentSources,
            method: "POST"
        }

        fetch(`${API_URL}/get_document_titles`, parameters)
            .then(res => res.json())
            .then(titledSources => {
                this.setState({sources: titledSources.data})
                localStorage.setItem("studyHelper", JSON.stringify({sources: titledSources.data}))
            })
    }

    componentDidMount() {
        this.getSources();
    }

    render() {
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
                            <th>Show Cards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sources.map(source => (
                            <tr>
                                <td>{source.id}</td>
                                <td>{source.title}</td>
                                <td>
                                    <Button onClick={() => this.setState({showCardList: true})}>Open</Button>
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </Table>
                {this.state.showCardList && 
                 <CardList closeModal={() => this.setState({showCardList: false})}/>}
            </div>
        )
    }
}
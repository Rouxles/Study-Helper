import React from 'react';
import {Button} from "react-bootstrap";
import {Card} from "react-bootstrap";

export default class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revealAnswer: false
        }
    }

    render() {
        return (
            <Card style={{margin: "auto", marginTop: "1vh"}}>
                <Card.Header>{this.props.card.majorTopic}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.card.subTopic}</Card.Title>
                    <Card.Text>{this.props.card.question}</Card.Text>
                    {this.state.revealAnswer ? (
                        <blockquote style={{height: "5vh"}}>
                            <Card.Text style={{color: "green"}}>
                                {this.props.card.answer}
                            </Card.Text>
                        </blockquote>
                    ) : <blockquote style={{height: "5vh"}}/>
                    }
                    <Button variant="primary" 
                     onClick={() => this.setState({revealAnswer: !this.state.revealAnswer})}
                    >
                        Reveal answer
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}
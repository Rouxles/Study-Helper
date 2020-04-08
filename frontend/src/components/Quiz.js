import React from 'react';
import {Form, Button, Col, Row} from "react-bootstrap"
import FlashCard from "./Card";

const API_URL = "http://0.0.0.0:8000"

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: null,
            cards: null
        }
    }

    generateCards() {
        const cards = [];

        for (let majorTopic of this.state.rawData) {
            const majorTopicTitle = majorTopic.major_topic;
            for (let subTopic of majorTopic.sub_topics) {
                const subTopicTitle = subTopic.sub_topic;
                for (let question of subTopic.questions) {
                    cards.push({
                        majorTopic: majorTopicTitle,
                        subTopic: subTopicTitle,
                        question: question.question,
                        answer: question.answer
                    })
                }
            }
        }

        this.setState({cards: cards});
    }

    componentDidMount() {
        fetch(`${API_URL}/get_structured_cards`)
            .then(res => res.json())
            .then(data => {
                this.setState({rawData: data.data});
                this.generateCards();
            });

    }

    render() {
        if (this.state.cards) {
            console.log(this.state.cards[0])
            return (
                <div>
                    <FlashCard card={this.state.cards[0]}/>
                    <Form style={{width: "80vw", margin: "auto", marginTop: "1vh"}}>
                        <Form.Row>
                            <Col xs={8}>
                                <Form.Control type="text" placeholder="Enter your answer" />
                            </Col>
                            <Col xs={4}>
                                <Row>
                                    <Col xs={6}>
                                        <Button variant="success" type="submit" style={{float: "left", width: "100%"}}>
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="outline-secondary" type="submit" style={{float: "left", width: "100%"}}>
                                            Skip
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            )
        } else {
            return null;
        }
    }
}
import React from 'react';
import {Form, Button, Col, Row, Dropdown} from "react-bootstrap"
import FlashCard from "./Card";

const API_URL = "http://0.0.0.0:8000"

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: null,
            cards: null,
            curCard: null,
            curCardSource: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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

    setRandomCard() {
        const randomIndex = Math.floor(Math.random() * (this.state.cards.length - 1));
        this.setState({curCard: this.state.cards[randomIndex]});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        if (e.key === "Enter" || e.type === "click") {
            const textBox = document.getElementById("quiz-textbox");
            const submittedAnswer = textBox.value;
            textBox.value = "";
            this.setRandomCard();
        }
    }

    componentDidUpdate() {
        // TODO: prevent infinite update loop.
        // Implement quiz generation from specific documentation sources

        fetch(`${API_URL}/get_structured_cards?id=${this.state.curCardSource}`)
            .then(res => res.json())
            .then(data => {
                this.setState({rawData: data.data});
                this.generateCards();
                this.setRandomCard();
            });
    }

    render() {
        const cardSources = JSON.parse(localStorage.getItem("studyHelper")).sources;

        if (!this.state.curCard || !this.state.curCardSource) {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        Select Flashcard Set
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {cardSources.map(source => (
                            <Dropdown.Item onClick={() => this.setState({curCardSource: source.id})}>
                                {source.title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        Select Flashcard Set
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {cardSources.map(source => (
                            <Dropdown.Item onClick={() => this.setState({curCardSource: source.id})}>
                                {source.title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <FlashCard card={this.state.curCard}/>
                <Form style={{width: "80vw", margin: "auto", marginTop: "1vh"}}>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control id="quiz-textbox" type="text" placeholder="Enter your answer" 
                             onKeyUp={this.handleSubmit}/>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <Col xs={6}>
                                    <Button variant="success" type="submit" 
                                     style={{float: "left", width: "100%"}} 
                                     onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button variant="outline-secondary" type="submit" 
                                     style={{float: "left", width: "100%"}}
                                    >
                                        Skip
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}
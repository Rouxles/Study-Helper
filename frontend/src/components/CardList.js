import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "react-bootstrap"

import FlashCard from "./Card"

const API_URL = "http://0.0.0.0:8000"

export default class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: null,
            cards: null,
            show: true
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

        return cards;
    }

    componentDidMount() {
        fetch(`${API_URL}/get_structured_cards?id=${this.props.id}`)
            .then(res => res.json())
            .then(data => this.setState({rawData: data.data}))
            .catch(e => {
                this.setState({show: false});
                this.props.closeModal();
                window.alert("Document is not of valid format");
            });
    }

    render() {
        if (this.state.rawData) {
            return (
                <Modal
                 size="xl"
                 show={this.state.show}
                 onHide={() => {
                        this.setState({show: false});
                        this.props.closeModal();
                    }}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.title}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.generateCards().map(card => (
                            <FlashCard card={card}/>
                        ))}
                    </Modal.Body>
                </Modal>
            )
        } else {
            return null;
        }
    }
}
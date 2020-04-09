import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default class CustomLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav.Link as={Link} to={this.props.to}>
              {this.props.children}
            </Nav.Link>
          );
    }
};
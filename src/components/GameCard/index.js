import React, { Component } from "react";
import { Collapse, Card, CardBody, Row, Col } from "reactstrap";
import { format, parse } from "date-fns";
import Aim from "../../shared/icons/Aim";
import Move from "../../shared/icons/Move";
import Vive from "../../shared/icons/Vive";
import Oculus from "../../shared/icons/Oculus";
import img from "../../shared/img/placeholder.png";
import "./index.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  formatDate(date) {
    if (date === "TBA") return "TBA";
    if (date === "Unreleased") return "Unreleased";
    return format(parse(date.slice(8, 18)), "MM-DD-YYYY");
  }

  render() {
    const game = this.props;
    return (
      <Card className="game-card" onClick={this.toggle}>
        <CardBody>
          <Row>
            <Col xs="2">
              <img
                src={img}
                style={{ height: "100px", width: "100px" }}
                alt="game"
              />
            </Col>
            <Col xs="8">
              <Row>
                <h5>{game.title}</h5>
              </Row>
              <Row>
                {game.developer} - {game.publisher}
              </Row>
              <Row>genre: {game.genre}</Row>
            </Col>
            <Col xs="2">
              <Row>
                <Col xs="4">{game.controlTypes.move ? <Move /> : ""}</Col>
                <Col xs="4">{game.controlTypes.aim ? <Aim /> : ""}</Col>
              </Row>
              <Row>
                <Col xs="4">{game.crossPlatform.vive ? <Vive /> : ""}</Col>
                <Col xs="4">{game.crossPlatform.rift ? <Oculus /> : ""}</Col>
              </Row>
            </Col>
          </Row>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <Row>
                  NA Relase Date: {this.formatDate(game.releaseDate.na)}
                </Row>
                <Row>
                  EU Relase Date: {this.formatDate(game.releaseDate.eu)}
                </Row>
                <Row>
                  JP Relase Date: {this.formatDate(game.releaseDate.jp)}
                </Row>
                <Row>
                  Asia Relase Date: {this.formatDate(game.releaseDate.asia)}
                </Row>
              </CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
}

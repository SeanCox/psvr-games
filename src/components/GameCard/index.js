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
  getDeveloper = url => {
    let toggle = false;
    let count = 0;
    let end = false;

    return url
      .split("")
      .slice(2, url.length - 1)
      .map(char => {
        if (count > 0 && end === false) toggle = true;
        if (char === ">") count++;
        if (char === "<") {
          end = true;
          toggle = false;
        }
        return toggle ? char : "";
      })
      .join("");
  };
  render() {
    const game = this.props;
    return (
      <Card className="game-card" onClick={this.toggle}>
        <CardBody>
          <Row>
            <Col xs={{ size: 4, order: 0 }} md="2">
              <img
                src={game.image || img}
                style={{ height: "100px", width: "100px" }}
                alt="game"
              />
            </Col>
            <Col md="8">
              <Row>
                <Col xs="12" className="game-title">
                  {game.title}
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  Developer: {this.getDeveloper(game.developer)}
                </Col>
                {/* <Col xs="12">Publisher: {game.publisher}</Col> */}
              </Row>
              <Row>
                <Col xs="12">genre: {game.genre}</Col>
              </Row>
            </Col>
            <Col md="2">
              <Row>
                <Col xs={{ size: 4, order: 1 }} md="4">
                  {game.controlTypes.move ? <Move /> : ""}
                </Col>
                <Col xs={{ size: 4, order: 2 }} md="4">
                  {game.controlTypes.aim ? <Aim /> : ""}
                </Col>
              </Row>
              <Row>
                <Col xs={{ size: 4, order: 3 }} md="4">
                  {game.crossPlatform.vive ? <Vive /> : ""}
                </Col>
                <Col xs={{ size: 4, order: 4 }} md="4">
                  {game.crossPlatform.rift ? <Oculus /> : ""}
                </Col>
              </Row>
            </Col>
          </Row>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <Row>Relase Date: {game.releaseDate}</Row>
              </CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
}

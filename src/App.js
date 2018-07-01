import React, { Component } from "react";
import { Container, Input, Button, Row, Col } from "reactstrap";
import ReactGA from "react-ga";
import NavBar from "./components/NavBar";
import GameCard from "./components/GameCard";
import "./App.css";
import games from "./shared/data/formattedListPSVR.json";

ReactGA.initialize("UA-121324232-1");
ReactGA.pageview(window.location.pathname);

class App extends Component {
  state = {
    searchTerm: "",
    dualshockFilter: false,
    moveFilter: false,
    aimFilter: false,
    flightFilter: false,
    wheelFilter: false,
    bikeFilter: false,
    headsetFilter: false
  };

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  toggleController(controller) {
    this.setState(prevState => ({ [controller]: !prevState[controller] }));
  }

  filterList() {
    let gamelist = games;
    if (this.state.dualshockFilter)
      gamelist = gamelist.filter(game => game.controlTypes.dualshock);
    if (this.state.moveFilter)
      gamelist = gamelist.filter(game => game.controlTypes.move);
    if (this.state.aimFilter)
      gamelist = gamelist.filter(game => game.controlTypes.aim);
    if (this.state.flightFilter)
      gamelist = gamelist.filter(game => game.controlTypes.flightstick);
    if (this.state.wheelFilter)
      gamelist = gamelist.filter(game => game.controlTypes.wheel);
    if (this.state.bikeFilter)
      gamelist = gamelist.filter(game => game.controlTypes.virzoom);
    if (this.state.headsetFilter)
      gamelist = gamelist.filter(game => game.controlTypes.psvr);
    return gamelist
      .filter(
        game =>
          game.title
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          game.developer
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          game.genre.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
      .map(gameInfo => (
        <Col key={gameInfo.title} xs="12" md="4">
          <GameCard {...gameInfo} />
        </Col>
      ));
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container style={{ marginTop: "100px" }}>
          <Row>
            <Col xs="12" md="4" style={{ marginBottom: "8px" }}>
              <Input
                value={this.state.searchTerm}
                placeholder="Search"
                onChange={e => this.updateSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={{ size: 3, offset: 0 }} md={{ size: 1, offset: 0 }}>
              <Button
                style={{ marginBottom: "8px" }}
                color={this.state.dualshockFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("dualshockFilter")}
              >
                DS4
              </Button>
            </Col>
            <Col xs="3" md={{ size: 1, offset: 0 }}>
              <Button
                color={this.state.moveFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("moveFilter")}
              >
                Move
              </Button>
            </Col>
            <Col xs="3" md="1">
              <Button
                color={this.state.aimFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("aimFilter")}
              >
                Aim
              </Button>
            </Col>
            <Col xs="3" md="1">
              <Button
                color={this.state.flightFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("flightFilter")}
              >
                Flight
              </Button>
            </Col>
            <Col xs="3" md="1">
              <Button
                color={this.state.wheelFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("wheelFilter")}
              >
                Wheel
              </Button>
            </Col>
            <Col xs="3" md="1">
              <Button
                color={this.state.bikeFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("bikeFilter")}
              >
                Bike
              </Button>
            </Col>
            <Col xs="3" md="2">
              <Button
                color={this.state.headsetFilter ? "warning" : "primary"}
                onClick={() => this.toggleController("headsetFilter")}
              >
                Headset
              </Button>
            </Col>
          </Row>
          <Row>{this.filterList()}</Row>
        </Container>
      </div>
    );
  }
}

export default App;

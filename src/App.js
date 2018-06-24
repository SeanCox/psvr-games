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
    aimFilter: false
  };

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  toggleDualshock() {
    this.setState({ dualshockFilter: !this.state.dualshockFilter });
  }
  toggleMove() {
    this.setState({ moveFilter: !this.state.moveFilter });
  }
  toggleAim() {
    this.setState({ aimFilter: !this.state.aimFilter });
  }

  filterList() {
    let gamelist = games;
    if (this.state.dualshockFilter)
      gamelist = gamelist.filter(game => game.controlTypes.dualshock);
    if (this.state.moveFilter)
      gamelist = gamelist.filter(game => game.controlTypes.move);
    if (this.state.aimFilter)
      gamelist = gamelist.filter(game => game.controlTypes.aim);
    return gamelist
      .filter(game =>
        game.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
      .map(gameInfo => <GameCard key={gameInfo.title} {...gameInfo} />);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container style={{ marginTop: "100px" }}>
          <Row>
            <Col xs="12" md="4">
              <Input
                value={this.state.searchTerm}
                placeholder="Search"
                onChange={e => this.updateSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={{ size: 3, offset: 3 }} md={{ size: 1, offset: 5 }}>
              <Button
                color={this.state.dualshockFilter ? "warning" : "primary"}
                onClick={() => this.toggleDualshock()}
              >
                DS4
              </Button>
            </Col>
            <Col xs="3" md={{ size: 1, offset: 0 }}>
              <Button
                color={this.state.moveFilter ? "warning" : "primary"}
                onClick={() => this.toggleMove()}
              >
                Move
              </Button>
            </Col>
            <Col xs="3" md="1">
              <Button
                color={this.state.aimFilter ? "warning" : "primary"}
                onClick={() => this.toggleAim()}
              >
                Aim
              </Button>
            </Col>
          </Row>
          {this.filterList()}
        </Container>
      </div>
    );
  }
}

export default App;

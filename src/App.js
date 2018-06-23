import React, { Component } from "react";
import { Container, Input, Button, Row, Col } from "reactstrap";
import NavBar from "./components/NavBar";
import GameCard from "./components/GameCard";
import "./App.css";
import games from "./shared/data/formattedListPSVR.json";

class App extends Component {
  state = {
    searchTerm: "",
    moveFilter: false,
    aimFilter: false
  };

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  toggleMove() {
    this.setState({ moveFilter: !this.state.moveFilter });
  }
  toggleAim() {
    this.setState({ aimFilter: !this.state.aimFilter });
  }

  filterList() {
    let gamelist = games;
    if (this.state.moveFilter)
      gamelist = gamelist.filter(game => game.controlTypes.move);
    if (this.state.aimFilter)
      gamelist = gamelist.filter(game => game.controlTypes.aim);
    return gamelist
      .filter(game => game.title.toLowerCase().includes(this.state.searchTerm))
      .map(gameInfo => <GameCard key={gameInfo.title} {...gameInfo} />);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container style={{ marginTop: "100px" }}>
          <Row>
            <Col xs="4">
              <Input
                value={this.state.searchTerm}
                placeholder="Search"
                onChange={e => this.updateSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={{ size: 1, offset: 6 }}>
              <Button
                color={this.state.moveFilter ? "warning" : "primary"}
                onClick={() => this.toggleMove()}
              >
                Move
              </Button>
            </Col>
            <Col xs="1">
              <Button
                color={this.state.aimFilter ? "warning" : "primary"}
                onClick={() => this.toggleAim()}
              >
                aim
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

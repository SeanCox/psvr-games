import React, { Component } from 'react';
import { Collapse, Card, CardBody, Row, Col } from 'reactstrap';
import Aim from '../../shared/icons/Aim';
import Dualshock from '../../shared/icons/Dualshock';
import Move from '../../shared/icons/Move';
// import Nav from '../../shared/icons/Nav';
import Bike from '../../shared/icons/Bike';
import Wheel from '../../shared/icons/Wheel';
import Flight from '../../shared/icons/Flight';
import Headset from '../../shared/icons/Headset';
import Info from '../../shared/icons/Info';
import img from '../../shared/img/placeholder.png';
import './index.css';

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
      .split('')
      .slice(2, url.length - 1)
      .map(char => {
        if (count > 0 && end === false) toggle = true;
        if (char === '>') count++;
        if (char === '<') {
          end = true;
          toggle = false;
        }
        return toggle ? char : '';
      })
      .join('');
  };
  render() {
    const game = this.props;
    console.log(game);
    return (
      <Card className="game-card">
        <CardBody>
          <Row>
            <Col xs={{ size: 4, order: 0 }}>
              <img src={game.image || img} style={{ height: '100px', width: '100px' }} alt="game" />
            </Col>
            <Col xs="8">
              <Col xs="12" className="game-title">
                {game.title}
              </Col>
              <Col xs="12" className="release-date">
                {game.releaseDate}
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 1, offset: 11 }} className="release-date" onClick={this.toggle}>
              <Info opacity="1" />
            </Col>
          </Row>

          <Row className="controller-icons">
            {game.controlTypes.dualshock ? <Dualshock opacity="1" /> : <Dualshock />}
            {game.controlTypes.move ? <Move opacity="1" /> : <Move />}
            {/* {game.controlTypes.nav ? <Nav opacity="1" /> : <Nav />} */}
            {game.controlTypes.aim ? <Aim opacity="1" /> : <Aim />}
            {game.controlTypes.flightstick ? <Flight opacity="1" /> : <Flight />}
            {game.controlTypes.wheel ? <Wheel opacity="1" /> : <Wheel />}
            {game.controlTypes.virzoom ? <Bike opacity="1" /> : <Bike />}
            {game.controlTypes.psvr ? <Headset opacity="1" /> : <Headset />}
          </Row>

          <Collapse isOpen={this.state.collapse}>
            <Card className="inner-card">
              <Row>
                <Col xs="12">
                  <div> {game.PSProEnhanced === '&#x2713;' ? 'PS4 Pro' : 'PS4'}</div>
                  <div> {game.numberOfPlayers} </div>
                  <div> {game.hasDisc === '&#x2713;' ? 'Retail Disc' : 'No Disc'}</div>
                  <div>Developer: {this.getDeveloper(game.developer)}</div>
                </Col>
                <Col xs="12" className="genre">
                  {game.genre}
                </Col>
              </Row>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
}

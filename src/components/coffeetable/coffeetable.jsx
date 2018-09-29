import React, { Component } from "react";
import Request from "superagent";

class CoffeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hbcCoffeeLovers: [],
      weeklyCoffeBuddies: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("1");
    this.setState(state => ({
      hbcCoffeeLovers: [],
      weeklyCoffeBuddies: []
    }));
    this.componentDidMount();
  }

  componentDidMount() {
    let url = `https://hbc-frontend-challenge.hbccommon.private.hbc.com/coffee-week/users`;
    Request.get(url).then(response => {
      var hbcUsers = JSON.parse(response.text);
      var userArray = this.createCoffeeLover(hbcUsers);
      this.setState({
        hbcCoffeeLovers: userArray
      });
      this.pairCoffeeLovers();
    });
  }

  createCoffeeLover(hbcUsers) {
    var userArray = this.state.hbcCoffeeLovers.slice();
    hbcUsers.users.forEach(element => {
      userArray.push(element.name.first + " " + element.name.last);
    });
    return userArray;
  }

  pairCoffeeLovers = () => {
    let coffeeLovers = this.state.hbcCoffeeLovers;
    console.log(coffeeLovers);
    var buddyOne;
    var buddyTwo;
    var weeklyCoffeePair = this.state.weeklyCoffeBuddies.slice();
    while (coffeeLovers.length !== 0) {
      buddyOne = coffeeLovers[Math.floor(Math.random() * coffeeLovers.length)];
      coffeeLovers.splice(coffeeLovers.indexOf(buddyOne), 1);
      buddyTwo = coffeeLovers[Math.floor(Math.random() * coffeeLovers.length)];
      coffeeLovers.splice(coffeeLovers.indexOf(buddyTwo), 1);
      weeklyCoffeePair.push(buddyOne + " -:- " + buddyTwo);
    }
    this.setState({
      weeklyCoffeBuddies: weeklyCoffeePair
    });
  };

  render() {
    return (
      <div>
        <div className="hbc-toolbar-desktop hbc-header">
          <p className="hbc-info">
            <button className="hbc-button" onClick={this.handleClick}>
              Get Coffee Lovers
            </button>
          </p>
        </div>
        <div className="hbc-cafe">
          <div className="hbc-cafe-inner">
            {this.state.weeklyCoffeBuddies.map(str => (
              <ul>
                <li key={str}>{str}</li>
              </ul>
            ))}
          </div>
        </div>
        <div>
          <div className="hbc-info hbc-toolbar-mobile">
            <button className="hbc-button" onClick={this.handleClick}>
              Get Coffee Lovers
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CoffeeTable;

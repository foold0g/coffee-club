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
      var user = {
        guid: element.guid,
        name: element.name.first + " " + element.name.last,
        location: element.location,
        department: element.department,
        motto: element.motto,
        email: element.email,
        phone: element.phone
      };
      userArray.push(user);
    });
    return userArray;
  }

  pairCoffeeLovers = () => {
    let coffeeLovers = this.state.hbcCoffeeLovers;
    var weeklyCoffeePair = this.state.weeklyCoffeBuddies.slice();

    while (coffeeLovers.length !== 0) {
      var randomPickOne = Math.floor(Math.random() * coffeeLovers.length);
      var buddyOneName = coffeeLovers[randomPickOne].name;
      var buddyOneEmail = coffeeLovers[randomPickOne].email;
      var buddyOnePhone = coffeeLovers[randomPickOne].phone;
      coffeeLovers.splice(randomPickOne, 1);

      var randomPickTwo = Math.floor(Math.random() * coffeeLovers.length);
      var buddyTwoName = coffeeLovers[randomPickTwo].name;
      var buddyTwoEmail = coffeeLovers[randomPickTwo].email;
      var buddyTwoPhone = coffeeLovers[randomPickTwo].phone;
      coffeeLovers.splice(randomPickTwo, 1);

      var coffeeLoversPair = {
        buddyPair: {
          buddyOne: {
            name: buddyOneName,
            email: buddyOneEmail,
            phone: buddyOnePhone
          },
          buddyTwo: {
            name: buddyTwoName,
            email: buddyTwoEmail,
            phone: buddyTwoPhone
          }
        }
      };
      weeklyCoffeePair.push(coffeeLoversPair);
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
              Pair Coffee Lovers
            </button>
            <span className="pair-text">
              This week's coffee Buddy Pairs are:
            </span>
          </p>
        </div>
        <div className="hbc-cafe">
          <div className="hbc-cafe-inner">
            <ul>
              {this.state.weeklyCoffeBuddies.map(str => (
                <li key={str.buddyPair.buddyOne.name}>
                  <div className="coffe-table">
                    <div className="coffee-lover">
                      {str.buddyPair.buddyOne.name}
                      <span className="hide-on-mobile-view">
                        {str.buddyPair.buddyOne.email}
                        <br />
                        {str.buddyPair.buddyOne.phone}
                      </span>
                    </div>
                    <div className="coffee-lover">
                      {str.buddyPair.buddyTwo.name}
                      <span className="hide-on-mobile-view">
                        {str.buddyPair.buddyTwo.email}
                        <br />
                        {str.buddyPair.buddyTwo.phone}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="hbc-info hbc-toolbar-mobile">
            <button className="hbc-button" onClick={this.handleClick}>
              Pair Coffee Lovers
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CoffeeTable;

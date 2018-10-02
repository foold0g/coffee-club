import React, { Component } from "react";
import Request from "superagent";

class CoffeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hbcCoffeeLovers: [],
      weeklyCoffeBuddies: []
    };
  }

  handleClick = () => {
    this.setState(state => ({
      hbcCoffeeLovers: [],
      weeklyCoffeBuddies: []
    }));
    this.componentDidMount();
  };

  componentDidMount() {
    let url = `https://hbc-frontend-challenge.hbccommon.private.hbc.com/coffee-week/users`;
    Request.get(url).then(response => {
      let hbcUsers = JSON.parse(response.text);
      let userArray = this.getAllCoffeeLovers(hbcUsers);
      this.setState({
        hbcCoffeeLovers: userArray
      });
      this.pairCoffeeLovers();
    });
  }

  checkPairAlreadyExists = (weeklyCoffeePair, giver, receiver) => {
    let pairExists = false;
    for (let i = 0; i < weeklyCoffeePair.length; i++) {
      if (
        (weeklyCoffeePair[i].giverName === giver &&
          weeklyCoffeePair[i].receiverName === receiver) ||
        (weeklyCoffeePair[i].giverName === receiver &&
          weeklyCoffeePair[i].receiverName === giver)
      ) {
        pairExists = true;
        break;
      }
    }
    return pairExists;
  };

  getAllCoffeeLovers(hbcUsers) {
    let userArray = this.state.hbcCoffeeLovers.slice();
    hbcUsers.users.forEach(element => {
      let user = {
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
    let weeklyCoffeePair = this.state.weeklyCoffeBuddies.slice();
    let givers = [];
    let receivers = [];
    while (coffeeLovers.length !== 0) {
      let randomPickOne = Math.floor(Math.random() * coffeeLovers.length);
      let buddyOneName = coffeeLovers[randomPickOne].name;
      coffeeLovers.splice(randomPickOne, 1);

      let randomPickTwo = Math.floor(Math.random() * coffeeLovers.length);
      let buddyTwoName = coffeeLovers[randomPickTwo].name;
      coffeeLovers.splice(randomPickTwo, 1);

      givers.push(buddyOneName);
      receivers.push(buddyTwoName);

      let coffeeLoversPair = {
        buddyPair: {
          buddyOne: {
            name: buddyOneName
          },
          buddyTwo: {
            name: buddyTwoName
          }
        }
      };
      weeklyCoffeePair.push(coffeeLoversPair);
    }

    givers.forEach(receiver => {
      let pairExists = false;
      let assignSuccess = false;
      while (receivers.lenth !== 0 && !assignSuccess) {
        let giver = receivers[Math.floor(Math.random() * receivers.length)];
        pairExists = this.checkPairAlreadyExists(
          weeklyCoffeePair,
          giver,
          receiver
        );
        if (pairExists) {
          receivers.splice(receivers.indexOf(giver), 1);
          assignSuccess = false;
        } else {
          let pair = {
            buddyPair: {
              buddyOne: {
                name: giver
              },
              buddyTwo: {
                name: receiver
              }
            }
          };
          weeklyCoffeePair.push(pair);
          receivers.splice(receivers.indexOf(giver), 1);
          assignSuccess = true;
        }
      }
    });

    this.setState({
      weeklyCoffeBuddies: weeklyCoffeePair
    });
    console.log(weeklyCoffeePair);
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
                    </div>
                    <div className="coffee-lover">
                      {str.buddyPair.buddyTwo.name}
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

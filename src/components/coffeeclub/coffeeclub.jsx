import React, { Component } from "react";
import Header from "../../components/header/header";
import CoffeeTable from "../../components/coffeetable/coffeetable";

class CoffeeClub extends Component {
  state = {};
  render() {
    return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Header />
        <CoffeeTable />
      </div>
    );
  }
}

export default CoffeeClub;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CoffeeClub from "./components/coffeeclub/coffeeclub";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<CoffeeClub />, document.getElementById("root"));
registerServiceWorker();

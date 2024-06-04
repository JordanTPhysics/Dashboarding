import React, { useState, useEffect } from "react";


import Dash from "./components/Dash";
import About from "./components/About/About";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: "welcome",

    };

  }

  selectRenderComponent = () => {
    switch (this.state.activeComponent) {

      case "dashboard":
        return <Dash />;
      case "about":
        return <About />;
      case "api":
        return <Api />;
      default:
        return <Dash />;
    }
  }

  componentDidMount() {

  }

  handleChange = (component, image) => {
    this.setState({ activeComponent: component});
  }


  render() {
    return (
      <div >
        <header className="row">

          <div className="col-md-6">
            <h1>G Rate Places Dashboard</h1>

          </div>


        </header>

        <div className="row menu-box">
          <ul>
            <li className="mainmenu"><a onClick={() => this.handleChange("dashboard")}>Dashboard</a></li>
            <li className="mainmenu"><a onClick={() => this.handleChange("api")}>API</a></li>
            <li className="mainmenu"><a onClick={() => this.handleChange("about")}>About</a></li>

          </ul>
        </div>
        <div className="row main">
            {this.selectRenderComponent()}
        </div>


        <footer className="footer row">
          <div className="container">
            <div className="footer-content">
              <p>© 2024 G Rate Places</p>
          </div>
          </div>
        </footer>
      </div>
    );
  }
}


export default App;

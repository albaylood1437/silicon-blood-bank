import React, { Component, Fragment } from "react";
import Navbar from "./Navbar/Navbar";

import GlobalStyle from "../../styles/Global";
import Slider from "./slider";
import Footer from "./footer";

class Header extends Component {
  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    return (
      <Fragment>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <Slider />
        <Footer />
        <GlobalStyle />
      </Fragment>
    );
  }
}

export default Header;

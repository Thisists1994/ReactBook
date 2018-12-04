import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();
    this.state = { themeColor: "" };
  }

  componentWillMount() {
    this._updateThemeColor();
    const { store } = this.context;
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor() {
    const { store } = this.context;
    // console.log(store); // context里的dispatch方法和getState
    const state = store.getState();
    this.setState({ themeColor: state.themeColor });
  }

  render() {
    return <h1 style={{ color: this.state.themeColor }}>React.js Book</h1>;
  }
}

export default Header;

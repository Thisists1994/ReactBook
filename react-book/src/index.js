import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentApp from "./CommentApp";
import "./index.css";

class Title extends Component {
  handleClickOnTitle(word, e) {
    console.log(this, word);
  }
  render() {
    return <h1 onClick={() => this.handleClickOnTitle("hello")}>React 小书</h1>;
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <Title />
        <h2>This is Header</h2>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <h2>This is main content</h2>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div>
        <h2>This is footer</h2>
      </div>
    );
  }
}

class Index extends Component {
  render() {
    return (
      <div className="wrapper">
        {/* <Header />
        <Main />
        <Footer /> */}
        <CommentApp />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

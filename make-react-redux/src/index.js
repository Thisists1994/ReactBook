import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Header from "./Header";
import Content from "./Content";
import "./index.css";

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = listener => listeners.push(listener); // 更新数据后重新渲染
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  return { getState, dispatch, subscribe };
}

const themeReducer = (state, action) => {
  if (!state) {
    return {
      themeColor: "red"
    };
  }
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, themeColor: action.themeColor };
    default:
      return state;
  }
};

const store = createStore(themeReducer);
store.dispatch({}); // 写action

class Index extends Content {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store };
  }

  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

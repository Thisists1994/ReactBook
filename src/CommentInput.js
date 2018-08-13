import React, { Component } from "react";

class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      content: ""
    };
    // 用户可输入内容一个是用户名（username），一个是评论内容（content），我们在组件的构造函数中初始化一个 state 来保存这两个状态
  }
  // 页面即将加载前,从location中拿到存入的username给用户名框
  componentWillMount() {
    const username = localStorage.getItem("username");
    if (username) {
      this.setState({ username });
    }
  }
  // 页面加载成功后获取到input的焦点
  componentDidMount() {
    this.refs.textarea.focus();
  }
  // 用户名信息
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }
  // 用户名失去焦点
  handleUsernameBlur(event) {
    localStorage.setItem("username", event.target.value); // 失去焦点的时候存入location
  }
  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }
  handleSubmit() {
    // 父组件 CommentApp 只需要通过 props 给子组件 CommentInput 传入一个回调函数onSubmit()。当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可。
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ username, content, createdTime: +new Date() });
    }
    this.setState({ content: "" });
  }
  // handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性。有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。然后再通过 setState 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）。

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={event => this.handleUsernameChange(event)}
              ref="myTextInput"
              onBlur={event => this.handleUsernameBlur(event)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              onChange={event => this.handleContentChange(event)}
              ref="textarea"
            />
            {/* 可以看到接受用户名输入的 <input /> 和接受用户评论内容的 <textarea /> 的 value 值分别由 state.username 和 state.content 控制 */}
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={() => this.handleSubmit()}>发布</button>
        </div>
      </div>
    );
  }
}

export default CommentInput;

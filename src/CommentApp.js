import React, { Component } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

class CommentApp extends Component {
  
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("请输入用户名");
    if (!comment.content) return alert("请输入评论内容");
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
    console.log(comment);
  }

  render() {
    return (
      <div>
        <CommentInput onSubmit={comment => this.handleSubmitComment(comment)} />
        {/* 在 CommentApp 中给 CommentInput 传入一个 onSubmit 属性，这个属性值是 CommentApp 自己的一个方法 handleSubmitComment。这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp。 */}
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentApp;

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

  // 页面加载前
  componentWillMount() {
    //页面加载前先获取location里是否有评论信息 有则先添加到List里
    this._loadComments();
  }

  // 我们增加了 _loadComments 和 _saveComments 分别用于加载和保存评论列表数据。
  _loadComments() {
    let comments = localStorage.getItem("comments");
    if (comments) {
      comments = JSON.parse(comments);
      this.setState({ comments });
    }
  }

  _saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("请输入用户名");
    if (!comment.content) return alert("请输入评论内容");
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
    // 提交的时候将评论存入location
    this._saveComments(this.state.comments);
    console.log(comment);
  }

  handleDeleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1); // 通过传入的需要删除的index删除数组里需要删除的评论
    this.setState({ comments });
    this._saveComments(comments); // 删除后重新保存到location里
  }

  render() {
    return (
      <div>
        <CommentInput onSubmit={comment => this.handleSubmitComment(comment)} />
        {/* 在 CommentApp 中给 CommentInput 传入一个 onSubmit 属性，这个属性值是 CommentApp 自己的一个方法 handleSubmitComment。这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp。 */}
        <CommentList
          comments={this.state.comments}
          onDeleteComment={index => this.handleDeleteComment(index)}
        />
      </div>
    );
  }
}

export default CommentApp;

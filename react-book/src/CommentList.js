import React, { Component } from "react";
import Comment from "./Comment";

class CommentList extends Component {
  static defaultProps = {
    comments: []
  };
  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
    // console.log(index); //这里拿到了index 传入给父级App
  }
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={index => this.handleDeleteComment(index)}
          />
        ))}
      </div>
    );
  }
}

export default CommentList;

import React, { Component } from "react";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      timeString: ""
    };
  }
  // 挂载前
  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(() => {
      this._updateTimeString();
    }, 5000);
  }

  // 页面卸载后
  componentWillUnmount() {
    // 页面评论组件销毁后清除定时器
    clearInterval(this._timer);
  }

  // 根据父组件传入 props.comment 里面的 createdTime 来更新这个 timeString
  _updateTimeString() {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    console.log(duration);
    this.setState({
      timeString:
        duration > 60
          ? `${Math.round(duration / 60)}分钟前`
          : `${Math.round(Math.max(duration, 1))} 秒前` // 至少大于1秒
    });
  }
  // 删除评论方法
  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      // console.log(this.props.index)// 这里是接受到了List传入的index

      this.props.onDeleteComment(this.props.index);
      // 这里调用List的方法把index传给List
    }
  }
  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.content}</p>
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span
          className="comment-delete"
          onClick={() => this.handleDeleteComment()}
        >
          删除
        </span>
      </div>
    );
  }
}

export default Comment;

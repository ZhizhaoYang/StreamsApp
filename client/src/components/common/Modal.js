import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
  render() {
    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals visible active"
        onClick={this.props.onDismiss}
      >
        <div
          className="ui standard modal visible active"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="ui header">{this.props.title}</h2>
          <div className="ui content">{this.props.content}</div>
          <div className="actions">{this.props.actions}</div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  }
}

export default Modal;

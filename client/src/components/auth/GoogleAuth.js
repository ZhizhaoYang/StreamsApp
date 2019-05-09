import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../../actions";

class GoogleAuth extends Component {
  constructor() {
    super();

    this.auth = null;
  }

  componentDidMount = () => {
    // load auth2 api from gapi documentation
    window.gapi.load("client:auth2", () => {
      // initialize the gapi by your clientId
      window.gapi.client
        .init({
          clientId:
            "1054677549802-a9mh9bagtpffrvo6gj25762e5f1cccjl.apps.googleusercontent.com",
          // decide to get what scope of user's information from google
          scope: "email"
        })
        // promise
        .then(() => {
          // store the return gapi.auth2 in a variable
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen to the change of authentication status and change the displaying content that in view
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  // method to listen to the auth status change
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // decide the render content to the header's login button
  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);

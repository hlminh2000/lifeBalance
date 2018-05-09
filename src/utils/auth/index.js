import React, { Fragment } from "react";
import Component from "react-component-component";
import facebookLogin from "./facebook";
import googleLogin from "./google";
import firebase from "react-native-firebase";
import PropTypes from "prop-types";

export default {
  facebookLogin,
  googleLogin,
  getCurrentUser: () => firebase.auth().currentUser,
  getUserToken: () => firebase.auth().currentUser.getIdToken()
};

export const userContextType = {
  user: PropTypes.object
};

export const UserProvider = ({ user, children }) => {
  class Provider extends React.Component {
    static childContextTypes = userContextType;
    getChildContext() {
      return { user };
    }
    render() {
      return <Fragment>{children}</Fragment>;
    }
  }
  return <Provider />;
};

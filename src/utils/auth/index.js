import React, { Fragment } from "react";
import Component from "react-component-component";
import facebookLogin from "./facebook";
import googleLogin from "./google";
import firebase from "react-native-firebase";
import PropTypes from "prop-types";

export const UserContext = React.createContext(null);

export const withIdToken = WrappedComponent => props => (
  <UserContext.Consumer>
    {user => (
      <Component
        initialState={{ idToken: null }}
        didMount={({ setState }) => {
          user.getIdToken().then(idToken => setState({ idToken }));
        }}
      >
        {({ state: { idToken } }) => (
          <WrappedComponent {...{ ...props, idToken }} />
        )}
      </Component>
    )}
  </UserContext.Consumer>
);

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

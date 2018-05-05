import React from "react";
import Component from "react-component-component";
import facebookLogin from "./facebook";
import googleLogin from "./google";
import firebase from "react-native-firebase";

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

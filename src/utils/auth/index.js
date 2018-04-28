import facebookLogin from "./facebook";
import googleLogin from "./google";
import firebase from "react-native-firebase";

export default {
  facebookLogin,
  googleLogin,
  getCurrentUser: () => firebase.auth().currentUser,
  getUserToken: () => firebase.auth().currentUser.getIdToken()
};

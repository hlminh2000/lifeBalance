import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";

// Calling the following function will open the FB login dialogue:
window.firebase = firebase;
export default async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email"
    ]);

    if (result.isCancelled) {
      return Promise.reject("CANCELLED");
    }

    console.log(
      `Login success with permissions: ${result.grantedPermissions.toString()}`
    );

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    console.log("data: ", data);

    if (!data) {
      throw new Error("Something went wrong obtaining the users access token"); // Handle this however fits the flow of your app
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    console.log("credential: ", credential);
    // login with credential
    // const currentUser = await firebase.auth().signInWithCredential(credential);
    const currentUser = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential);

    console.log("currentUser: ", currentUser);

    // console.log("current user: ", firebase.auth().currentUser);
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(data => console.log("idToken: ", data));

    return currentUser;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

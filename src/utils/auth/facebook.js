import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";

// Calling the following function will open the FB login dialogue:
export default async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email"
    ]);

    if (result.isCancelled) {
      throw new Error("User cancelled request"); // Handle this however fits the flow of your app
    }

    console.log(
      `Login success with permissions: ${result.grantedPermissions.toString()}`
    );

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error("Something went wrong obtaining the users access token"); // Handle this however fits the flow of your app
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.toJSON()));
    return currentUser.toJSON();
  } catch (e) {
    console.error(e);
    return e;
  }
};

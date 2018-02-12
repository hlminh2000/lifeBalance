import { GoogleSignin } from "react-native-google-signin";
import firebaseApp from "../firebaseApp";

// Calling this function will open Google for login.
export default async () => {
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebaseApp.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    );
    // login with credential
    const currentUser = await firebaseApp
      .auth()
      .signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.toJSON()));
    return currentUser.toJSON();
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

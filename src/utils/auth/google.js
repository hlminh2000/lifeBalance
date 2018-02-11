import { GoogleSignin } from "react-native-google-signin";

// Calling this function will open Google for login.
const googleLogin = async () => {
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    );
    // login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.toJSON()));
    return currentUser.toJSON();
  } catch (e) {
    return e;
    console.error(e);
  }
};

export default googleLogin;

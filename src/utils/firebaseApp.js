import firebase from "react-native-firebase";
const FIREBASE_CONFIG = require("../FIREBASE_CONFIG.json");

const app = firebase.initializeApp(FIREBASE_CONFIG);

export default app;

import firebase from "firebase/app";
import "firebase/auth";
let object=require("./secret");
firebase.initializeApp(object);
let auth =firebase.auth();
export default auth;
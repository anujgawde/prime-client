import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const createUserWithEmailAndPasswordHandler = async (
  email,
  password
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordHandler = async (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
  }
};

export const signInWithGoogleHandler = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const signOutHandler = () => {
  return auth.signOut();
};

export const passwordResetHandler = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const passwordChangeHandler = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const emailVerficationHandler = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/dashboard`,
  });
};

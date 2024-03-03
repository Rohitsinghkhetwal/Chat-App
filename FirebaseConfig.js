// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB93IzGYs5Vwa2USz5dDIgCjew3d6qD460",
  authDomain: "fir-chat-app-c8fe4.firebaseapp.com",
  projectId: "fir-chat-app-c8fe4",
  storageBucket: "fir-chat-app-c8fe4.appspot.com",
  messagingSenderId: "784444524544",
  appId: "1:784444524544:web:f9458565bc6d762b5cb0e5",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");

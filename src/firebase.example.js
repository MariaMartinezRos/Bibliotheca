import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx",
  projectId: "xxxxxxxx",
  storageBucket: "xxxxxxxx",
  messagingSenderId: "xxxxxxxx",
  appId: "xxxxxxxx",
  measurementId: "xxxxxxxx",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpntTNgGje2mb224GJ40nfmDKvTb_cWGA",
  authDomain: "bibliotheca-reactjs.firebaseapp.com",
  projectId: "bibliotheca-reactjs",
  storageBucket: "bibliotheca-reactjs.firebasestorage.app",
  messagingSenderId: "842849276361",
  appId: "1:842849276361:web:12963e67c8b9c5c77b1818",
  measurementId: "G-XX4H97NXM0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

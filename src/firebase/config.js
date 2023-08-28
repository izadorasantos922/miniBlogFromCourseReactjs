
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM6LWmb05856d_pQ6P5n-lhjodOjXfb8I",
  authDomain: "miniblog2-86c0d.firebaseapp.com",
  projectId: "miniblog2-86c0d",
  storageBucket: "miniblog2-86c0d.appspot.com",
  messagingSenderId: "963218904672",
  appId: "1:963218904672:web:c4c96b8d385f91ba645505"
};

const app = initializeApp(firebaseConfig);

const  db = getFirestore(app);
export {db}
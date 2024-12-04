// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAaxjVvPv3tVF59CvEFS8nONu3y64KE8Dc",
  authDomain: "cdproject-83bb6.firebaseapp.com",
  projectId: "cdproject-83bb6",
  storageBucket: "cdproject-83bb6.firebasestorage.app",
  messagingSenderId: "894832722907",
  appId: "1:894832722907:web:5b51643f4b673f1e24ddfe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

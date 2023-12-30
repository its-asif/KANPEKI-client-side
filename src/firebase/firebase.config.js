// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOzP12RUUCAvt6aAtczD-OJaBYfr8miMI",
  authDomain: "kanpeki-8da37.firebaseapp.com",
  projectId: "kanpeki-8da37",
  storageBucket: "kanpeki-8da37.appspot.com",
  messagingSenderId: "251433485234",
  appId: "1:251433485234:web:82a61a54eca0cd39505aab",
  measurementId: "G-995J4F3YFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
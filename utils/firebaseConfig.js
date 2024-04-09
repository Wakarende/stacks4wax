// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC53TiuQdYu_ZcnFAuloMRic9VaXrluHwc",

  authDomain: "stack4wax.firebaseapp.com",

  projectId: "stack4wax",

  storageBucket: "stack4wax.appspot.com",

  messagingSenderId: "124130761412",

  appId: "1:124130761412:web:dcec6ac8b6246b83d30791",

  measurementId: "G-DZL8VXZSTQ",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

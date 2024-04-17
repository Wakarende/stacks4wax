"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analytics = exports.app = void 0;

var _app = require("firebase/app");

var _analytics = require("firebase/analytics");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;
var analytics; // Only initialize Analytics if it's supported and if running client-side

exports.analytics = analytics;

if (typeof window !== "undefined") {
  (0, _analytics.isSupported)().then(function (supported) {
    if (supported) {
      exports.analytics = analytics = (0, _analytics.getAnalytics)(app);
    }
  })["catch"](function (error) {
    console.error("Analytics not supported", error);
  });
}
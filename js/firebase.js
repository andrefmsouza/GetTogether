var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDzHHtx0RRLQb6biIQd35IM6jdAm83Vg3o",
  authDomain: "hackathongetnet.firebaseapp.com",
  databaseURL: "https://hackathongetnet.firebaseio.com",
  projectId: "hackathongetnet",
  storageBucket: "hackathongetnet.appspot.com",
  messagingSenderId: "287167719449",
  appId: "1:287167719449:web:c497daa1f95c4215166288",
  measurementId: "G-6SV2448YGS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBE2-qaGOOlmhn9QA01J5wizJ_CcMMh7qE",
  authDomain: "ifix-store-eecd9.firebaseapp.com",
  projectId: "ifix-store-eecd9",
  storageBucket: "ifix-store-eecd9.firebasestorage.app",
  messagingSenderId: "862863699996",
  appId: "1:862863699996:web:7af653f4de7d0baa0fafd9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      name: user.displayName,
      email: user.email,
      createdAt: new Date()
    },
    { merge: true }
  );

  document.getElementById("userName").innerHTML =
    "مرحباً " + user.displayName + " 👋";

  loginBtn.style.display = "none";
});


import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
const loginBtn = document.getElementById("loginBtn");
const profileBox = document.getElementById("userProfileBox");

if(user){

    loginBtn.style.display = "none";

    profileBox.style.display = "block";

    document.getElementById("headerUserPhoto").src =
      user.photoURL;

}else{

    loginBtn.style.display = "flex";

    profileBox.style.display = "none";

}



  if (user) {

    console.log("User Logged:", user.displayName);

    document.getElementById("userName").innerHTML =
      "مرحباً " + user.displayName + " 👋";

    document.getElementById("loginBtn").style.display = "none";

  }

});


document
.getElementById("userProfileBox")
.addEventListener("click",()=>{

    window.location.href="profile.html";

});

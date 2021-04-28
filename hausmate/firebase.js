import firebase from "firebase";
require("firebase/firestore");
require("firebase/auth");
import Hashids from "hashids";

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyA7-WKCy2vL9bO_SyoWXatKEncM70uTRMI",
        authDomain: "hausmate-ea88d.firebaseapp.com",
        databaseURL: "https://hausmate-ea88d.firebaseio.com",
        projectId: "hausmate-ea88d",
        storageBucket: "hausmate-ea88d.appspot.com",
        messagingSenderId: "601095849691",
        appId: "1:601095849691:web:733c105a00be4715e32efe",
      });
    }
  }

  login = async (user, success_callback, failed_callback) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((UserCredential) => {
        let user = UserCredential.user;
      })
      .then(success_callback, failed_callback);
    // await firebase
    //   .auth()
    //   .signInWithEmailAndPassword(user.email, user.password)
    //   .then(success_callback, failed_callback);
  };

  createAccount = async (user) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function () {
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function () {
              console.log("User " + user.name + " was created successfully.");
            },
            function (error) {
              console.warn("Error update displayName.");
            }
          );
          return [userf, user.name];
        },
        function (error) {
          console.error("got error:" + error.message);
          alert("Create account failed.");
        }
      )
      .then(([userf, name]) => {
        const collection = firebase.firestore().collection("users");
        const details = {
          name: name,
          email: userf.email,
        };
        collection.doc(userf.uid).set(details);
      });
  };

  createHaus = async (user, hausName) => {
    const collection = firebase.firestore().collection("hauses");

    const count = await collection.get().then((snap) => {
      return snap.size; // will return the collection size
    });

    const identity = new Hashids(
      "Hausmate",
      5,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    );

    const hausIdentifier = identity.encode(count);

    await collection.doc(hausIdentifier).set({
      members: [user.uid],
      name: hausName,
    });

    console.log("Haus created!");

    return hausIdentifier;
  };

  addToHaus = async (user, hausIdentifier) => {
    const identity = new Hashids(
      "Hausmate",
      5,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    );

    const collection = await firebase.firestore().collection("hauses");
    const haus = await collection.doc(hausIdentifier);

    haus
      .get()
      .then(async function (doc) {
        if (doc.exists()) {
          const currentMembers = doc.data().members;
          const updatedMembers = [...currentMembers, user.id];
          collection.doc(hausIdentifier).update({ members: updatedMembers });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    if (!haus.exists()) {
      alert("No such document!");
    } else {
    }
  };
}

const firebaseSvc = new FirebaseSvc();

export default firebaseSvc;

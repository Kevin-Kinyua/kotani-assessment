const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.login = functions.https.onRequest(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userCredential = await admin.auth().signInWithEmailAndPassword(email,
        password);
    res.status(200).send(userCredential.user.toJSON());
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid email or password");
  }
});

// USER CREATION

exports.createUser = functions.https.onRequest(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;
  const idNumber = req.body.idNumber;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password});

    await admin.firestore().collection("users").doc(userRecord.uid).set({
      dob: dob,
      idNumber: idNumber});

    res.status(200).send(userRecord.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});


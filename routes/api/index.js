const { Router } = require("express");

const firebase = require("../../utils/firebase");

const router = Router();

// console.log(firebase.firestore().collection('products').add({name: "Arijit", email: "arijit"}))

module.exports = router;

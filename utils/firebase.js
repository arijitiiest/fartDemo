const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};

// const serviceAccount = require("/home/arijitiiest/Documents/Firebase/fartdemo1-firebase-adminsdk-qwscv-b135d78775.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "project_id": process.env.PROJECT_ID
  }),
});

firebase.initializeApp(firebaseConfig);

module.exports = { firebase, admin };

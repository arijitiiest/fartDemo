const { firebase, admin } = require("../utils/firebase");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userInfo = await admin.auth().verifyIdToken(token);

    if (!admin.auth().getUser(userInfo.uid)) {
      res.status(400).json({ message: "Not in Auth" });
      res.end();
    }

    if (!firebase.firestore().collection("users").doc(userInfo.uid)) {
      res.status(400).json({ message: "Not in firestore" });
      res.end();
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not authenticated" });
  }
};

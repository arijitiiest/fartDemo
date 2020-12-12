const { firebase, admin } = require("../../../utils/firebase");

// console.log(firebase.firestore().collection('products').add({name: "Arijit", email: "arijit"}))

const db = firebase.firestore();

exports.getUsers = async (req, res) => {
  try {
    const response = await db.collection("users").get();
    const users = [];
    response.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.postUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birthday,
      phoneno,
      email,
      password,
    } = req.body;
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await firebase
      .firestore()
      .collection("users")
      .doc(user.user.uid)
      .set({ first_name, last_name, birthday, phoneno, email });

    res.status(201).json({ message: "User created", user: user.user.uid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    await db.collection("users").doc(user_id).delete();
    await admin.auth().deleteUser(user_id);
    res.status(205).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.editUser = async (req, res) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      birthday,
      phoneno,
      email,
      password,
    } = req.body;
    await db
      .collection("users")
      .doc(user_id)
      .update({ first_name, last_name, birthday, phoneno, email });
    await admin.auth().updateUser(user_id, { email, password });
    res.status(201).json({ message: "Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

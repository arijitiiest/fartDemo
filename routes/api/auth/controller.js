const { firebase, admin } = require("../../../utils/firebase");

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (!user) {
      throw new Error("No user found");
    }

    const idToken = await firebase.auth().currentUser.getIdToken(true);
    res.status(200).json({ token: idToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.postRegister = async (req, res) => {
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

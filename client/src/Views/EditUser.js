import React, { useState } from "react";
import axois from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://arijitchowdhury.me/">
        ARIJIT CHOWDHURY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddUser = (props) => {
  const {
    user_id,
    first_name_props,
    last_name_props,
    email_props,
    // password_props,
    birthday_props,
    phoneno_props,
  } = props.location.state;
  const classes = useStyles();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("2020-12-13");
  const [phoneno, setPhoneno] = useState();

  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirst_name(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLast_name(e.target.value);
  };
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };
  const handlePhonenoChange = (e) => {
    setPhoneno(e.target.value);
  };

  useState(() => {
    setFirst_name(first_name_props);
    setLast_name(last_name_props);
    setEmail(email_props);
    // setPassword(password_props);
    setBirthday(birthday_props);
    setPhoneno(phoneno_props);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      password.length === 0 ||
      first_name.length === 0 ||
      last_name.length === 0 ||
      phoneno.length !== 10 ||
      !email_regex.test(email)
    ) {
      console.log("Error");
      alert("Error")
      return;
    }
    axois
      .patch(
        "/api/user",
        { user_id, email, password, first_name, last_name, phoneno, birthday },
        { headers: { authorization: sessionStorage.getItem("Token") } }
      )
      .then((res) => res.data)
      .then((done) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit User
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={first_name}
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={last_name}
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Birthday"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={birthday}
                onChange={handleBirthdayChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneno"
                label="Phone No"
                type="number"
                id="phoneno"
                autoComplete="Phone_no"
                value={phoneno}
                onChange={handlePhonenoChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AddUser;

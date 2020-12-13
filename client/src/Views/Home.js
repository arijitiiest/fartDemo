import React, { useEffect, useState } from "react";
import axois from "axios";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AppBar, Button, Grid, IconButton, Toolbar } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("Token") || !sessionStorage.getItem("uid"))
      props.history.push("/login");
    else {
      axois
        .get("/api/user", {
          headers: { authorization: sessionStorage.getItem("Token") },
        })
        .then((res) => res.data)
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
          // props.history.push("/");
        });
    }
  }, [props.history]);

  const handleDelete = (id) => {
    axois
      .delete(`/api/user/?user_id=${id}`, {
        headers: { authorization: sessionStorage.getItem("Token") },
      })
      .then((res) => res.data)
      .then(() => {
        console.log("Deleted");
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log("deleted");
        props.history.push("/");
      });
  };

  const handleAddButton = () => {
    props.history.push("/add-user");
  };

  const handleEditButton = (
    user_id,
    first_name_props,
    last_name_props,
    email_props,
    // password_props,
    birthday_props,
    phoneno_props
  ) => {
    console.log("hxch");
    props.history.push({
      pathname: "/edit-user",
      state: {
        user_id,
        first_name_props,
        last_name_props,
        email_props,
        // password_props,
        birthday_props,
        phoneno_props,
      },
    });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  console.log("rendered");

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fart Magazine
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Grid item xs={12} style={{ margin: "5rem" }}>
        <Toolbar>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            <div>Users</div>

            <div className={classes.search} style={{ paddingLeft: "1rem" }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
                value={keyword}
              />
            </div>
          </Typography>
          <Typography>
            <Add onClick={handleAddButton} fontSize="large" />
          </Typography>
        </Toolbar>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Bithday</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter(
                (user) =>
                  user.first_name.includes(keyword) ||
                  user.last_name.includes(keyword) ||
                  user.email.includes(keyword) ||
                  user.phoneno.includes(keyword) ||
                  user.birthday.includes(keyword)
              )
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.birthday}</TableCell>
                  <TableCell>{row.phoneno}</TableCell>
                  <TableCell>
                    {sessionStorage.getItem("uid") !== row.id ? (
                      <Delete
                        onClick={() => handleDelete(row.id)}
                        color="secondary"
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {sessionStorage.getItem("uid") !== row.id ? (
                      <Edit
                        onClick={() =>
                          handleEditButton(
                            row.id,
                            row.first_name,
                            row.last_name,
                            row.email,
                            // row.password,
                            row.birthday,
                            row.phoneno
                          )
                        }
                        color="primary"
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
    </React.Fragment>
  );
};

export default Home;

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
import { makeStyles } from "@material-ui/core/styles";

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
}));

const Home = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

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
  });

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
            Users
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
            {users.map((row) => (
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

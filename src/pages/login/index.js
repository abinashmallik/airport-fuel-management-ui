import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/** redux **/
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import * as selectors from "./redux/reducer";

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Airport Fuel Management
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChange = (password) => (event) => {
    this.setState({
      [password]: event.target.value,
    });
  };

  handleSubmit = async () => {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    await this.props.dispatch(actions.authenticateUser(payload));
    if (this.props.statusCode === 200) {
      localStorage.setItem("token", this.props.token);
      this.props.history.push("/airports");
    }
    if (this.props.statusCode === 401 || this.props.statusCode === 500) {
      alert("Wrong Credentials");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "white",
          borderRadius: "4px",
        }}
      >
        <CssBaseline />
        <div
          className={classes.paper}
          style={{ padding: "10px", marginTop: "30%" }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={classes.submit}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: selectors.getValue(state, "loading"),
    message: selectors.getValue(state, "message"),
    token: selectors.getValue(state, "token"),
    statusCode: selectors.getValue(state, "statusCode"),
  };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Login" }),
  connect(mapStateToProps, null)
)(Login);

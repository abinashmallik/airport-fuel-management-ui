import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import compose from "recompose/compose";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AppBar from "../../components/AppBar";
import SnackBar from "../../components/SnackBar";
import { Link } from "react-router-dom";

/** redux **/
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import * as selectors from "./redux/reducer";

const styles = (theme) => ({});

const initialState = {
  transactionDateTime: new Date(),
  transactionType: "",
  airportId: "",
  aircraftId: "",
  quantity: 0,
  transactionIdParent: "0",
  airports: [],
  aircrafts: [],
  snackBarMsg: "",
};

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.props.dispatch(actions.getAircrafts());
    await this.props.dispatch(actions.getAirports());
    this.setState({
      airports: this.props.airports,
      aircrafts: this.props.aircrafts,
    });
  }

  handleDateChange = (event) => {
    this.setState({
      transactionDateTime: event,
    });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async () => {
    const payload = {
      transactionDateTime: this.state.transactionDateTime,
      transactionType: this.state.transactionType,
      airportId: this.state.airportId,
      aircraftId: this.state.aircraftId,
      quantity: this.state.quantity,
      transactionIdParent: this.state.transactionIdParent,
    };
    await this.props.dispatch(actions.createTransaction(payload));
    if (this.props.statusCode === 200) {
      this.setState(initialState);
      this.setState({ snackBarMsg: "Added new transaction" });
    }
  };

  render() {
    return (
      <>
        <AppBar />
        <div className="main">
          <Link
            to="/transaction-listing"
            style={{ textDecoration: "none", float: "right" }}
          >
            <Button variant="outlined" color="secondary">
              Back
            </Button>
          </Link>
          Add a Transaction
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  value={this.state.transactionDateTime}
                  onChange={this.handleDateChange}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="transaction-type">
                  Select Transaction Type
                </InputLabel>
                <Select
                  native
                  value={this.state.transactionType}
                  onChange={this.handleChange("transactionType")}
                  fullWidth
                  inputProps={{
                    name: "Select Transaction Type",
                    id: "transaction-type",
                  }}
                >
                  <option value="" />
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="airport">Select Airport</InputLabel>
                <Select
                  native
                  value={this.state.airportId}
                  onChange={this.handleChange("airportId")}
                  fullWidth
                  inputProps={{
                    name: "Select Airport",
                    id: "airports",
                  }}
                >
                  <option value="" />
                  {this.state.airports.map((value) => (
                    <option key={value._id} value={value._id}>
                      {value.airportName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="aircrafts">Select Aircraft</InputLabel>
                <Select
                  native
                  value={this.state.aircraftId}
                  onChange={this.handleChange("aircraftId")}
                  fullWidth
                  inputProps={{
                    name: "Select Aircraft",
                    id: "aircraft",
                  }}
                >
                  <option value="" />
                  {this.state.aircrafts.map((value) => (
                    <option key={value._id} value={value._id}>
                      {value.aircraftNo}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                fullWidth
                value={this.state.quantity}
                onChange={this.handleChange("quantity")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          {this.state.snackBarMsg && (
            <SnackBar message={this.state.snackBarMsg} />
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: selectors.getValue(state, "loading"),
    message: selectors.getValue(state, "message"),
    transaction: selectors.getValue(state, "transaction"),
    statusCode: selectors.getValue(state, "statusCode"),
    aircrafts: selectors.getValue(state, "aircrafts"),
    airports: selectors.getValue(state, "airports"),
  };
}

Transaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Transaction" }),
  connect(mapStateToProps, null)
)(Transaction);

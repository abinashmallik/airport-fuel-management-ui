import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import AppBar from "../../components/AppBar";
import ExpansionPanel from "../../components/ExpansionPanel";
import { Button, Grid, Paper } from "@material-ui/core";

/** redux **/
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import * as selectors from "./redux/reducer";

const styles = (theme) => ({});

class Consumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      airports: [],
      aircrafts: [],
      showFuelReport: true,
      showAirportReport: false,
      reports: [],
    };
  }

  async componentDidMount() {
    await this.props.dispatch(actions.getAircrafts());
    await this.props.dispatch(actions.getAirports());
    await this.props.dispatch(actions.fetchTransaction());
    this.setState(
      {
        airports: this.props.airports,
        aircrafts: this.props.aircrafts,
        transactions: this.props.transactions,
      },
      () => this.createReportData()
    );
  }

  createReportData = () => {
    const getAirportNameById = (id, airports) => {
      const airport = airports.filter((el) => {
        return el._id === id;
      });
      return airport.length > 0 ? airport[0].airportName : null;
    };
    const getAircraftNameById = (id, aircrafts) => {
      const aircraft = aircrafts.filter((el) => el._id === id);
      return aircraft.length > 0 ? aircraft[0].airline : null;
    };
    const getFuelReports = () => {
      let result = [];
      const airports = this.state.airports;
      const aircrafts = this.state.aircrafts;
      const transactions = this.state.transactions;

      for (let i = 0; i < transactions.length; i++) {
        let transaction = {
          date: transactions[i].transactionDateTime,
          type: transactions[i].transactionType,
          quantity: transactions[i].quantity,
          airport: "",
          aircraft: "",
        };
        transaction.airport = getAirportNameById(
          transactions[i].airportId,
          airports
        );
        transaction.aircraft = getAircraftNameById(
          transactions[i].aircraftId,
          aircrafts
        );
        result.push(transaction);
      }
      return result;
    };

    const getFuelReportsByAirport = (reports) => {
      const airportNames = this.state.airports.map((el) => el.airportName);
      const result = [];
      for (let i = 0; i < airportNames.length; i++) {
        let obj = {};
        obj.airport = airportNames[i];
        obj.reports = [];
        result.push(obj);
      }
      for (let i = 0; i < result.length; i++) {
        let airport = result[i].airport;
        for (let j = 0; j < reports.length; j++) {
          if (reports[j].airport === airport) {
            result[i].reports.push(reports[j]);
          }
        }
      }
      this.setState({ reports: result });
    };
    const fuelReports = getFuelReports();
    getFuelReportsByAirport(fuelReports);
  };

  render() {
    return (
      <>
        <AppBar />
        <div className="main">
          {this.state.showAirportReport && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right" }}
                onClick={() =>
                  this.setState({
                    showFuelReport: true,
                    showAirportReport: false,
                  })
                }
              >
                Show fuel consumption report
              </Button>
              <br />
              Airport Summary Report
              <Paper style={{ padding: "2%" }}>
                <Grid container>
                  <Grid item xs={6}>
                    Airport
                  </Grid>
                  <Grid item xs={6}>
                    Fuel Available
                  </Grid>
                </Grid>
                <hr />
                {this.state.airports.map((airport) => {
                  return (
                    <Grid
                      container
                      key={airport._id}
                      style={{ marginTop: "5px" }}
                    >
                      <Grid item xs={6}>
                        {airport.airportName}
                      </Grid>
                      <Grid item xs={6}>
                        {airport.fuelAvailable}
                      </Grid>
                    </Grid>
                  );
                })}
              </Paper>
            </>
          )}
          {this.state.showFuelReport && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right" }}
                onClick={() =>
                  this.setState({
                    showFuelReport: false,
                    showAirportReport: true,
                  })
                }
              >
                Show airport consumption report
              </Button>
              <br />
              Fuel Consumption Report
              {this.state.reports.map((report) => {
                return (
                  <ExpansionPanel heading={report.airport} report={report} />
                );
              })}
            </>
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
    transactions: selectors.getValue(state, "transactions"),
    statusCode: selectors.getValue(state, "statusCode"),
    aircrafts: selectors.getValue(state, "aircrafts"),
    airports: selectors.getValue(state, "airports"),
  };
}

Consumption.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Consumption" }),
  connect(mapStateToProps, null)
)(Consumption);

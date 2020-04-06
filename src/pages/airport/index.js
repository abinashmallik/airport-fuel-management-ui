import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import SortTable from "../../components/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { stableSort, getSorting } from "../../utils/apputil";
import AppBar from "../../components/AppBar";
import SnackBar from "../../components/SnackBar";
import { Button, Grid, TextField } from "@material-ui/core";

/** redux **/
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import * as selectors from "./redux/reducer";

const headCells = [
  {
    id: "airportName",
    numeric: false,
    disablePadding: true,
    label: "Airport Name",
  },
  {
    id: "fuelCapacity",
    numeric: false,
    disablePadding: true,
    label: "Fuel Capacity",
  },
  {
    id: "fuelAvailable",
    numeric: false,
    disablePadding: true,
    label: "Fuel Available",
  },
];

const styles = (theme) => ({});

class Airport extends React.Component {
  constructor(props) {
    super();
    this.state = {
      airports: [
        { mobile: "988899", id: "1" },
        { mobile: "988899", id: "2" },
        { mobile: "988899", id: "3" },
      ],
      order: "asc",
      orderBy: "airportName",
      newRows: [],
      addAirport: false,
      airportName: "",
      fuelCapacity: 0,
      fuelAvailable: 0,
      snackBarMsg: "",
    };
  }

  componentDidMount() {
    this.mount();
  }

  mount = async () => {
    await this.props.dispatch(actions.getAirports());
    this.setState({ airports: this.props.airports }, () => this.loadTable());
  };

  loadTable = () => {
    const rowData = this.createTableCells();
    this.setState({ newRows: rowData });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async () => {
    const payload = {
      airportName: this.state.airportName,
      fuelCapacity: this.state.fuelCapacity,
      fuelAvailable: this.state.fuelAvailable,
    };
    await this.props.dispatch(actions.addAiport(payload));
    if (this.props.statusCodeAddAirport === 201) {
      this.setState(
        {
          addAirport: false,
          snackBarMsg: "Successfully added airport",
        },
        () => this.mount()
      );
    }
    this.setState({ addAiport: false });
  };

  createTableCells = () => {
    return stableSort(
      this.state.airports,
      getSorting(this.state.order, this.state.orderBy)
    ).map((row, index) => {
      const labelId = `table-${index}`;
      return (
        <TableRow tabIndex={-1} key={labelId}>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.airportName}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.fuelCapacity}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.fuelAvailable}
          </TableCell>
        </TableRow>
      );
    });
  };

  sort = (property) => {
    const sortOrder = this.state.order === "asc" ? "desc" : "asc";
    this.setState({ order: sortOrder, orderBy: property });
    this.loadTable();
  };

  render() {
    return (
      <>
        <AppBar />
        <div className="main">
          {!this.state.addAirport && (
            <>
              <p>Airports</p>
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right" }}
                onClick={() => this.setState({ addAirport: true })}
              >
                Add Airport
              </Button>

              <SortTable
                headCells={headCells}
                orderBy={this.state.orderBy}
                order={this.state.order}
                sort={this.sort}
                rows={this.state.newRows}
              />
            </>
          )}

          {this.state.addAirport && (
            <>
              <p>Add a Airport</p>
              <Grid container spacing={1} style={{ marginTop: "10px" }}>
                <Grid item xs={12}>
                  <TextField
                    id="airport-name"
                    label="Airport Name"
                    variant="outlined"
                    fullWidth
                    value={this.state.airportName}
                    onChange={this.handleChange("airportName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="fuel-capacity"
                    label="Fuel Capacity"
                    variant="outlined"
                    fullWidth
                    value={this.state.fuelCapacity}
                    onChange={this.handleChange("fuelCapacity")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="fuel-available"
                    label="Fuel Available"
                    variant="outlined"
                    fullWidth
                    value={this.state.fuelAvailable}
                    onChange={this.handleChange("fuelAvailable")}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.setState({ addAirport: false })}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </div>
        {this.state.snackBarMsg && (
          <SnackBar message={this.state.snackBarMsg} />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: selectors.getValue(state, "loading"),
    message: selectors.getValue(state, "message"),
    airports: selectors.getValue(state, "airports"),
    statusCode: selectors.getValue(state, "statusCode"),
    loadingAddAirport: selectors.getValue(state, "loadingAddAirport"),
    messageAddAirport: selectors.getValue(state, "messageAddAirport"),
    statusCodeAddAirport: selectors.getValue(state, "statusCodeAddAirport"),
  };
}

Airport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Airport" }),
  connect(mapStateToProps, null)
)(Airport);

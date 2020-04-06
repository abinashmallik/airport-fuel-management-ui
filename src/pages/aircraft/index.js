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
    id: "aircraftNo",
    numeric: false,
    disablePadding: true,
    label: "Aircraft Number",
  },
  {
    id: "airline",
    numeric: false,
    disablePadding: true,
    label: "Airline",
  },
  {
    id: "source",
    numeric: false,
    disablePadding: true,
    label: "Source",
  },
  {
    id: "destination",
    numeric: false,
    disablePadding: true,
    label: "Desitnation",
  },
];

const styles = (theme) => ({});

class Aircraft extends React.Component {
  constructor(props) {
    super();
    this.state = {
      aircrafts: [],
      order: "asc",
      orderBy: "aircraftNo",
      newRows: [],
      addAircraft: false,
      snackBarMsg: "",
      aircraftNo: "",
      airline: "",
      source: "",
      destination: "",
    };
  }

  componentDidMount() {
    this.mount();
  }

  mount = async () => {
    await this.props.dispatch(actions.getAircrafts());
    this.setState({ aircrafts: this.props.aircrafts }, () => this.loadTable());
  };

  loadTable = () => {
    const rowData = this.createTableCells();
    this.setState({ newRows: rowData });
  };

  createTableCells = () => {
    return stableSort(
      this.state.aircrafts,
      getSorting(this.state.order, this.state.orderBy)
    ).map((row, index) => {
      const labelId = `table-${index}`;
      return (
        <TableRow tabIndex={-1} key={labelId}>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.aircraftNo}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.airline}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.source}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.destination}
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

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async () => {
    const payload = {
      aircraftNo: this.state.aircraftNo,
      airline: this.state.airline,
      source: this.state.source,
      destination: this.state.destination,
    };
    await this.props.dispatch(actions.addAircraft(payload));
    if (this.props.statusCodeAddAircraft === 201) {
      this.setState(
        {
          addAircraft: false,
          snackBarMsg: "Successfully added aircraft",
        },
        () => this.mount()
      );
    }
  };

  render() {
    return (
      <>
        <AppBar />
        <div className="main">
          {!this.state.addAircraft && (
            <>
              <p>Aircrafts</p>
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right" }}
                onClick={() => this.setState({ addAircraft: true })}
              >
                Add Aircraft
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

          {this.state.addAircraft && (
            <>
              <p>Add a Aircraft</p>
              <Grid container spacing={1} style={{ marginTop: "10px" }}>
                <Grid item xs={12}>
                  <TextField
                    id="aircraft-no"
                    label="Aircraft Number"
                    variant="outlined"
                    fullWidth
                    value={this.state.aircraftNo}
                    onChange={this.handleChange("aircraftNo")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="airline"
                    label="Airline"
                    variant="outlined"
                    fullWidth
                    value={this.state.airline}
                    onChange={this.handleChange("airline")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="source"
                    label="Source"
                    variant="outlined"
                    fullWidth
                    value={this.state.source}
                    onChange={this.handleChange("source")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="destination"
                    label="Destination"
                    variant="outlined"
                    fullWidth
                    value={this.state.destination}
                    onChange={this.handleChange("destination")}
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
                    onClick={() => this.setState({ addAircraft: false })}
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
    aircrafts: selectors.getValue(state, "aircrafts"),
    statusCode: selectors.getValue(state, "statusCode"),
    loadingAddAircraft: selectors.getValue(state, "loadingAddAircraft"),
    messageAddAircraft: selectors.getValue(state, "messageAddAircraft"),
    statusCodeAddAircraft: selectors.getValue(state, "statusCodeAddAircraft"),
  };
}

Aircraft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Aircraft" }),
  connect(mapStateToProps, null)
)(Aircraft);

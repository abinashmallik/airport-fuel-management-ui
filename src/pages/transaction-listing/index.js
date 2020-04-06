import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import SortTable from "../../components/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { stableSort, getSorting, formatDateTime } from "../../utils/apputil";
import AppBar from "../../components/AppBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SnackBar from "../../components/SnackBar";

/** redux **/
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import * as selectors from "./redux/reducer";

const headCells = [
  {
    id: "transactionDateTime",
    numeric: false,
    disablePadding: true,
    label: "Transaction Date Time",
  },
  {
    id: "transactionType",
    numeric: false,
    disablePadding: true,
    label: "Transaction Type",
  },
  {
    id: "airportId",
    numeric: false,
    disablePadding: true,
    label: "Airport ID",
  },
  {
    id: "aircraftId",
    numeric: false,
    disablePadding: true,
    label: "Aircraft ID",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: true,
    label: "Quantity",
  },
];

const styles = (theme) => ({});

class Transactions extends React.Component {
  constructor(props) {
    super();
    this.state = {
      transactions: [],
      order: "asc",
      orderBy: "quantity",
      newRows: [],
      snackBarMsg: "",
    };
  }

  componentDidMount() {
    this.mount();
  }

  mount = async () => {
    await this.props.dispatch(actions.getTransactions());
    this.setState({ transactions: this.props.transactions }, () =>
      this.loadTable()
    );
  };

  loadTable = () => {
    const rowData = this.createTableCells();
    this.setState({ newRows: rowData });
  };

  createTableCells = () => {
    return stableSort(
      this.state.transactions,
      getSorting(this.state.order, this.state.orderBy)
    ).map((row, index) => {
      const labelId = `table-${index}`;
      return (
        <TableRow tabIndex={-1} key={labelId}>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {formatDateTime(row.transactionDateTime)}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.transactionType}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.airportId}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.aircraftId}
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="default">
            {row.quantity}
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

  resetTrans = async () => {
    await this.props.dispatch(actions.resetTransactions());
    if (this.props.statusCodeReset === 200) {
      this.setState(
        {
          snackBarMsg: "Successfully reset all transactional data",
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
          <p>Transactions</p>

          <Link
            to="/add-transaction"
            style={{ textDecoration: "none", float: "right" }}
          >
            <Button variant="outlined" color="secondary">
              Add a Transaction
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="secondary"
            style={{ float: "right" }}
            onClick={() => this.resetTrans()}
          >
            Reset all transactional data
          </Button>
          <SortTable
            headCells={headCells}
            orderBy={this.state.orderBy}
            order={this.state.order}
            sort={this.sort}
            rows={this.state.newRows}
          />
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
    transactions: selectors.getValue(state, "transactions"),
    loadingReset: selectors.getValue(state, "loadingReset"),
    messageReset: selectors.getValue(state, "messageReset"),
    statusCodeReset: selectors.getValue(state, "statusCodeReset"),
  };
}

Transactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { name: "Transactions" }),
  connect(mapStateToProps, null)
)(Transactions);

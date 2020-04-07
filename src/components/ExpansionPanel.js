import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatDateTime } from "../utils/apputil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.heading}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "inline-block", width: "100%" }}
        >
          <Grid container xs={12}>
            <Grid item xs={3}>
              Date
            </Grid>
            <Grid item xs={3}>
              Type
            </Grid>
            <Grid item xs={3}>
              Aircraft
            </Grid>
            <Grid item xs={3}>
              Fuel
            </Grid>
          </Grid>
          <hr />
          {props.report.reports.map((transaction) => {
            return (
              <>
                <Grid container>
                  <Grid item xs={3}>
                    {formatDateTime(transaction.date)}
                  </Grid>
                  <Grid item xs={3}>
                    {transaction.type}
                  </Grid>
                  <Grid item xs={3}>
                    {transaction.aircraft}
                  </Grid>
                  <Grid item xs={3}>
                    {transaction.quantity}
                  </Grid>
                </Grid>
              </>
            );
          })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

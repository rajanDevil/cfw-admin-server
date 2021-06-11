import React from 'react';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-admin';


const styles = {
  button: {
    marginTop: '1em',
  }
};

const AddSalesButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="contained" 
    color="primary"
    component={Link}
    to={`/sales/create?customer_id=${record.id}`}
    label="Add Sales"
    title="Add Sales"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddSalesButton);
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

const AddProductsSoldButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="contained" 
    color="primary"
    component={Link}
    to={`/productsSold/create?sale_id=${record.id}&customer_id=${record.customer_id}`}
    label="Add Products"
    title="Add Products"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddProductsSoldButton);
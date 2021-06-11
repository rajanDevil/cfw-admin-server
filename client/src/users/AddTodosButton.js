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

const AddTodosButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="contained" 
    color="primary"
    component={Link}
    to={`/todos/create?userID=${record.id}`}
    label="Add Todo"
    title="Add Todo"
  >
    <Add />
  </Button>
);

export default withStyles(styles)(AddTodosButton);
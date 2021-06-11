import React, { useState, useCallback } from 'react';
import { ReferenceInput, 
    SelectInput,
  
 } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import VendorsQuickCreateButton from './VendorsQuickCreateButton';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});


const VendorCategoriesReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);

    const handleChange = useCallback(() => setVersion(version + 1), [version]);

    return (
        <div className={classes.root}>
            <ReferenceInput key={version} {...props}>
                <SelectInput optionText="category" />
            </ReferenceInput>

            <VendorsQuickCreateButton onChange={handleChange} />
            
        </div>
    );
};

export default VendorCategoriesReferenceInput;

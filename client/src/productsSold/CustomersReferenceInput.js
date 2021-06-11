import React, { useState, useCallback } from 'react';

import { ReferenceInput, SelectInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useFormState } from 'react-final-form';

import CustomersQuickPreviewButton from './CustomersQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});
const spySubscription = { values: true };

const CustomersReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const handleChange = useCallback(() => setVersion(version + 1), [version]);
    const { values } = useFormState({ subscription: spySubscription });
    return (
        <div className={classes.root}>
            <ReferenceInput key={version} {...props}>
                <SelectInput optionText="customer_name" />
            </ReferenceInput>

           
            {!!values.customer_id && <CustomersQuickPreviewButton id={values.customer_id} />}
        </div>
    );
};

export default CustomersReferenceInput;

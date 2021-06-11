import React, { useState, useCallback } from 'react';

import { ReferenceInput, SelectInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useFormState } from 'react-final-form';

import PurchasesQuickPreviewButton from './PurchasesQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});
const spySubscription = { values: true };

const PurchasesReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const handleChange = useCallback(() => setVersion(version + 1), [version]);
    const { values } = useFormState({ subscription: spySubscription });
    return (
        <div className={classes.root}>
            <ReferenceInput key={version} {...props}>
                <SelectInput optionText="id" />
            </ReferenceInput>

           
            {!!values.purchase_id && <PurchasesQuickPreviewButton id={values.purchase_id} />}
        </div>
    );
};

export default PurchasesReferenceInput;

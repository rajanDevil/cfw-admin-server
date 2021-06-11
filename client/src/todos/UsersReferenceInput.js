import React, { useState, useCallback } from 'react';

import { ReferenceInput, SelectInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useFormState } from 'react-final-form';
import UsersQuickCreateButton from './UsersQuickCreateButton';
import UsersQuickPreviewButton from './UsersQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});
const spySubscription = { values: true };

const UsersReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const handleChange = useCallback(() => setVersion(version + 1), [version]);
    const { values } = useFormState({ subscription: spySubscription });
    return (
        <div className={classes.root}>
            <ReferenceInput key={version} {...props}>
                <SelectInput optionText="username" />
            </ReferenceInput>

            <UsersQuickCreateButton onChange={handleChange} />
            {!!values.userID && <UsersQuickPreviewButton id={values.userID} />}
        </div>
    );
};

export default UsersReferenceInput;

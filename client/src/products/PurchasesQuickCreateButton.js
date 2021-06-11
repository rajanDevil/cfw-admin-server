import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    useCreate,
    useNotify,
    FormWithRedirect,
    PasswordInput,
    DateInput,
    TextField,
    NumberInput,
    CheckboxGroupInput,
    ReferenceField,
    ChipField
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import VendorsReferenceInput from './VendorsReferenceInput';

function PurchasesQuickCreateButton({ onChange }) {
    const [showDialog, setShowDialog] = useState(false);
    const [create, { loading }] = useCreate('purchases');
    const notify = useNotify();
    const form = useForm();

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleSubmit = async values => {
        create(
            { payload: { data: values } },
            {
                onSuccess: ({ data }) => {
                    setShowDialog(false);
                    // Update the comment form to target the newly created post
                    // Updating the ReferenceInput value will force it to reload the available posts
                    form.change('vendor_id', data.id);
                    onChange();
                },
                onFailure: ({ error }) => {
                    notify(error.message, 'error');
                }
            }
        );
    };

    return (
        <>
            <Button onClick={handleClick} label="ra.action.create">
                <IconContentAdd />
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label="Create Purchases"
            >
                <DialogTitle>Create Purchases</DialogTitle>

                <FormWithRedirect
                    resource="purchases"
                    save={handleSubmit}
                    render={({
                        handleSubmitWithRedirect,
                        pristine,
                        saving
                    }) => (
                        <>
                            <DialogContent>
                                <TextField source="id" key/>
                                <VendorsReferenceInput 
                                    source="vendor_id"
                                    reference="vendors"
                                    label="Vendor Name"
                                />
                                <DateInput source="purchase_date" key/>
                                <NumberInput source="cost" key/>
                                <CheckboxGroupInput source="mode" choices={[
                                    { id: 'e-payment', name: 'e-payment' },
                                    { id: 'cash', name: 'cash' },
                                    { id: 'credit', name: 'credit' },
                                ]} />
                                <NumberInput source="amount_paid" key/>
                                <NumberInput source="remaining_due" key/>
                                
                               
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    label="ra.action.cancel"
                                    onClick={handleCloseClick}
                                    disabled={loading}
                                >
                                    <IconCancel />
                                </Button>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    pristine={pristine}
                                    saving={saving}
                                    disabled={loading}
                                />
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
        </>
    );
}

export default PurchasesQuickCreateButton;

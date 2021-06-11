import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    TextField,
    ReferenceField,
    ChipField,
    DateField,
    NumberInput,
    CheckboxGroupInput
} from 'react-admin';
import { useLocation } from 'react-router';
import VendorsReferenceInput from './VendorsReferenceInput';
import {parse} from 'query-string';


const PurchasesCreate = props => {
    const { vendor_id: vendor_id_string } = parse(props.location.search);

    let vendor_id = vendor_id_string ? parseInt(vendor_id_string, 10) : '';

    let redirect = vendor_id ? `/vendors/${vendor_id}/show` : false;
    // Read the post_id from the location
    // const location = useLocation();
    // const id =
    //     location.state && location.state.record
    //         ? location.state.record.id
    //         : undefined;
    // const redirect = id ? `/vendors/${id}/show` : false;

    return (
        <Create {...props}>
            <SimpleForm
            initialValues={{vendor_id:vendor_id }}
            redirect={redirect}
            >
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
            </SimpleForm>
        </Create>
    );
};

export default PurchasesCreate;

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
import CustomersReferenceInput from './CustomersReferenceInput';
import {parse} from 'query-string';


const SalesCreate = props => {
    const { customer_id: customer_id_string } = parse(props.location.search);

    let customer_id = customer_id_string ? parseInt(customer_id_string, 10) : '';

    let redirect = customer_id ? `/customers/${customer_id}/show` : false;
    // Read the post_id from the location
    // const location = useLocation();
    // const id =
    //     location.state && location.state.record
    //         ? location.state.record.id
    //         : undefined;
    // const redirect = id ? `/customers/${id}/show` : false;

    return (
        <Create {...props}>
            <SimpleForm
            initialValues={{customer_id:customer_id }}
            redirect={redirect}
            >
                <TextField source="id" key/>
                <CustomersReferenceInput 
                    source="customer_id"
                    reference="customers"
                    label="Customer Name"
                />
                <DateInput source="sale_date" key/>
                <NumberInput source="amount" key/>
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

export default SalesCreate;

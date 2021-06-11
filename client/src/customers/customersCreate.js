import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput
} from 'react-admin';

const customersCreate = props => {
    // Read the post_id from the location
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="id" disabled/>
                <TextInput source="customer_name" />
                <NumberInput source="contact_number" />
                <TextInput source="address" />
                <DateInput source="creation_date" />
                <TextInput source="social_link" />

            </SimpleForm>
        </Create>
    );
};

export default customersCreate;

import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,

} from 'react-admin';


const vendorCategoriesCreate = props => {
    // Read the post_id from the location
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="id" disabled/>
                <TextInput source="category" />
            </SimpleForm>
        </Create>
    );
};

export default vendorCategoriesCreate;

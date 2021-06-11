import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
} from 'react-admin';
import { useLocation } from 'react-router';
import VendorCategoriesReferenceInput from './VendorCategoriesReferenceInput';



const VendorsCreate = props => {
    // Read the post_id from the location
    const location = useLocation();
    const id =
        location.state && location.state.record
            ? location.state.record.id
            : undefined;
    const redirect = id ? `/vendors/${id}/show` : false;

    return (
        <Create {...props}>
            <SimpleForm
            redirect={redirect}
            >
                <TextInput source="id" disabled/>
                <TextInput source="vendor_name"/>
                <TextInput source="shop_name"/>
                <TextInput source="contact_number"/>
                <TextInput source="address"/>
                <VendorCategoriesReferenceInput 
                    source="category"
                    reference="vendorCategories"
                    label="Vendor Categories"
                />
                <DateInput source="creation_date"/>
            </SimpleForm>
        </Create>
    );
};

export default VendorsCreate;

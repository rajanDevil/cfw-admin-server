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
import PurchasesReferenceInput from './PurchasesReferenceInput';
import ProductsReferenceInput from './ProductsReferenceInput';
import {parse} from 'query-string';


const vendorReturnsCreate = props => {
    const { customer_id: customer_id_string } = parse(props.location.search);

    let customer_id = customer_id_string ? parseInt(customer_id_string, 10) : '';

    let redirect = customer_id ? `/customers/${customer_id}/show` : false;
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
            initialValues={{customer_id:customer_id }}
            redirect={redirect}
            >
                <TextField source="id" key/>
                <VendorsReferenceInput 
                    source="vendor_id"
                    reference="vendors"
                    label="Vendor Name"
                />
                <PurchasesReferenceInput
                    source="purchase_id"
                    reference="purchases"
                    label="Purchase ID"
                />
                <ProductsReferenceInput 
                    source="product_id"
                    reference="products"
                    label="Product Name"
                />
                <NumberInput source="qty" key/>
                <NumberInput source="rate" key/>
                <TextInput source="variant" key/>
                <DateInput source="returned_at" key/>
            </SimpleForm>
        </Create>
    );
};

export default vendorReturnsCreate;

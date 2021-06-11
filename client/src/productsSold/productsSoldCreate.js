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
import SalesReferenceInput from './SalesReferenceInput';
import ProductsReferenceInput from './ProductsReferenceInput';
import {parse} from 'query-string';


const productsSoldCreate = props => {
    const { customer_id: customer_id_string } = parse(props.location.search);

    let customer_id = customer_id_string ? parseInt(customer_id_string, 10) : '';

    const { sale_id: sale_id_string } = parse(props.location.search);

    let sale_id = sale_id_string ? parseInt(sale_id_string, 10) : '';

    let redirect = sale_id ? `/sales/${sale_id}/show` : false;
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
            initialValues={{customer_id:customer_id,sale_id:sale_id  }}
            redirect={redirect}
            >
                <TextField source="id" key/>
                <SalesReferenceInput
                    source="sale_id"
                    reference="sales"
                    label="Sale ID"
                />
                <CustomersReferenceInput 
                    source="customer_id"
                    reference="customers"
                    label="Customer Name"
                />
                <ProductsReferenceInput 
                    source="product_id"
                    reference="products"
                    label="Product Name"
                />
                <NumberInput source="qty" key/>
                <NumberInput source="rate" key/>
                <TextInput source="variant" key/>
                <DateInput source="sold_at" key/>
            </SimpleForm>
        </Create>
    );
};

export default productsSoldCreate;

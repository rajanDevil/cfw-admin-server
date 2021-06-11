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
    CheckboxGroupInput,
    ImageField,
    ImageInput,
    SingleFieldList,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import { useLocation } from 'react-router';
import VendorsReferenceInput from './VendorsReferenceInput';
import PurchasesReferenceInput from './PurchasesReferenceInput';
import {parse} from 'query-string';
import Chip from '@material-ui/core/Chip';

const TextArrayField = ({ record, source }) => {
    const theRecord = record[source];
    const array = theRecord.split(',');
    console.log(array);
    if (typeof array === 'undefined' || array === null || array.length === 0) {
      return <div/>
    } else {
      return (
        <>
          {array.map(item => <Chip label={item} key={item}/>)}
        </>
      )    
    }
  }
  TextArrayField.defaultProps = { addLabel: true }
const ProductsCreate = props => {
    const { vendor_id: vendor_id_string } = parse(props.location.search);

    let vendor_id = vendor_id_string ? parseInt(vendor_id_string, 10) : '';

    const { purchase_id: purchase_id_string } = parse(props.location.search);

    let purchase_id = purchase_id_string ? parseInt(purchase_id_string, 10) : '';

    let redirect = purchase_id ? `/purchases/${purchase_id}/show` : false;
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
            initialValues={{vendor_id:vendor_id, purchase_id:purchase_id}}
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
               
                <TextInput source="product_name" key/>
                <TextInput source="description" key/>
                <NumberInput source="price" key/>
                <ImageInput source="image" label="Product Image" accept="image/*" placeholder={<p>Drop your image here</p>}>
                        <ImageField source="src" title="title" />
                </ImageInput>
                <NumberInput source="purchased_qty" key/>
                <NumberInput source="stock" key/>
                <TextInput source="variant" label="comma separated variants"/>
                <DateInput source="created_at" key/>
                
            </SimpleForm>
        </Create>
    );
};

export default ProductsCreate;

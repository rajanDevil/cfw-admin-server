import * as React from "react";
import { 
    TextInput,
    Edit,
    SimpleForm,
    DateInput,
    TextField,
    ReferenceField,
    ChipField,
    DateField,
    NumberInput,
    CheckboxGroupInput,
    ReferenceInput,
    SelectInput,
    ImageInput,
    ImageField
} from 'react-admin';
import VendorsReferenceInput from './VendorsReferenceInput';
import PurchasesReferenceInput from './PurchasesReferenceInput';
import Chip from '@material-ui/core/Chip';

const mystyle = {
    padding: "10px",
    margin: "2px"
  };
const TextArrayField = ({ record, source }) => {
    const theRecord = record[source];
    const array = theRecord.split(',');
    console.log(array);
    if (typeof array === 'undefined' || array === null || array.length === 0) {
      return <div/>
    } else {
      return (
        <>
          {array.map(item => <Chip style={mystyle} label={item} key={item}/>)}
        </>
      )    
    }
  }
  TextArrayField.defaultProps = { addLabel: true }

const ProductsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
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
                <ImageField source="image" title="title" />
                <ImageInput source="image" label="Change Image" accept="image/*" placeholder={<p>Drop your image here</p>}>
                        <ImageField source="image" title="title" />
                </ImageInput>
                <NumberInput source="purchased_qty" key/>
                <NumberInput source="stock" key/>
                <TextArrayField source="variant" />
                <TextInput source="variant" label="comma separated variants"/>
                <DateInput source="created_at" key/>
        
        </SimpleForm>
    </Edit>
);
export default ProductsEdit;
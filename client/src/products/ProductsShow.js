import * as React from "react";
import { 
    TextField,
    SimpleForm,
    Show,
    ReferenceField,
    ChipField,
    DateField,
    NumberField,
    ImageField,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';

const mystyle = {
    padding: "10px",
    margin: "2px"
  };
const imageStyle = {
    width: "10px"
}
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
  const LinkedChips = ({record, source}) =>{
    const theRecord = record[source];
    const UrlSource = "#/purchases/"+theRecord+"/show";
    return(
    
          <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>
  
     
    )
  }
  LinkedChips.defaultProps = { addLabel: true }
const ProductsShow = props => (
    <Show {...props}>
        <SimpleForm>
            <TextField source="id" key/>
            <ReferenceField label="Vendor Name" source="vendor_id" reference="vendors">
                <ChipField source="vendor_name" />
            </ReferenceField>
            <LinkedChips source="purchase_id" label="Purchase ID"/> 
            <TextField source="product_name" key/>
            <TextField source="description" key/>
            <NumberField source="price" key/>
            <ImageField source="image" style={imageStyle}/>
            <NumberField source="purchased_qty" key/>
            <NumberField source="stock" key/>
            <TextArrayField source="variant" />
            <DateField source="created_at" key/>
       
            
        </SimpleForm>
    </Show>
  );

  export default ProductsShow;
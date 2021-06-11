import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    DateField,
    ReferenceField,
    ChipField,
    DeleteButton,
    ShowButton,
    NumberField,
    ImageField,
    SingleFieldList,
    ReferenceManyField,
    UrlField
} from 'react-admin';
import ProductsFilter from './ProductsFilter';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import Link from '@material-ui/core/Link';

const mystyle = {
    margin: "2px",
    textDecoration: "none"
  };

  const imgStyle = {
   width: "75px",
   height: "auto"
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

const AvatarField = ({record, source})=>{
  const theRecord = record[source];
  return(
  <Avatar src={theRecord} style={imgStyle} />
  )
}
const LinkedChips = ({record, source}) =>{
  const theRecord = record[source];
  const UrlSource = "#/purchases/"+theRecord+"/show";
  return(
  
        <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>

   
  )
}

const ProductsList = props => (
    <List filters={<ProductsFilter />} {...props}>
        <Datagrid>
            <TextField source="id" key/>
            <ReferenceField label="Vendor Name" source="vendor_id" reference="vendors">
                <ChipField source="vendor_name" />
            </ReferenceField>
            <LinkedChips source="purchase_id" />            
            <TextField source="product_name" key/>
            <TextField source="description" key/>
            <NumberField source="price" key/>
            <AvatarField source="image"/>
            <NumberField source="purchased_qty" key/>
            <NumberField source="stock" key/>
            <TextArrayField source="variant" />
            <DateField source="created_at" key/>
            <ShowButton label="Show" />
            <EditButton label="Edit"/>  
            <DeleteButton label="Delete"/>   
        </Datagrid>
    </List>
);

export default ProductsList;

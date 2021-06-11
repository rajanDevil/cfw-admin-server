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
    Pagination,
    Datagrid,
    NumberField,
    ShowButton,
    EditButton,
    DeleteButton,
    ReferenceManyField
} from 'react-admin';
import AddProductsSoldButton from './AddProductsSoldButton';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import VendorsReferenceInput from './VendorsReferenceInput';
import ProductsReferenceInput from './ProductsReferenceInput';
import PurchasesReferenceInput from './PurchasesReferenceInput';
const mystyle = {
    margin: "2px"
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
    const UrlSource = "#/vendors/"+theRecord+"/show";
    return(
    
          <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>
  
     
    )
  }
const vendorReturnsEdit = props => (
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
          <ProductsReferenceInput 
              source="product_id"
              reference="products"
              label="Product Name"
          />
          <NumberInput source="qty" key/>
          <NumberInput source="rate" key/>
          <TextInput source="variant" key/>
          <DateInput source="returned_at" key/>
            
            {/* <ReferenceManyField
                label="Products Sold"
                reference="products_sold"
                target="sale_id"
                sort={{ field: 'id', order: 'DESC' }}
                pagination={<Pagination />}
                addLabel={true}
                perPage = {5}
                >
                <Datagrid>
                    <TextField source="id" key/>
                    <ReferenceField label="Vendor Name" source="vendor_id" reference="vendors">
                        <ChipField source="vendor_name" />
                    </ReferenceField>
                    <LinkedChips source="sale_id" />   
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
            </ReferenceManyField> */}
            {/* <AddProductsButton /> */}
        </SimpleForm>
    </Edit>
);
export default vendorReturnsEdit;
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
    ReferenceManyField,
    Pagination,
    useGetOne
} from 'react-admin';
import CustomerReturnsFilter from './CustomerReturnsFilter'
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";

const mystyle = {
    margin: "2px",
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
  const { data } = useGetOne('products', theRecord);
  const UrlSource = "#/products/"+theRecord+"/show";
  
  console.log(data);
  return(
      
        <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>

   
  )
}


const customerReturnsList = props => (
    <List filters={<CustomerReturnsFilter />} {...props}>
        <Datagrid>
            <TextField source="id" key/>
            <LinkedChips source="product_id" label="Product ID"/>
            <ReferenceField label="Product Name" source="product_id" reference="products">
                <ChipField source="product_name" />
            </ReferenceField>
            <ReferenceField label="Sale ID" source="sale_id" reference="sales">
                <ChipField source="id" />
            </ReferenceField>
            
            <ReferenceField label="Customer Name" source="customer_id" reference="customers">
                <ChipField source="customer_name" />
            </ReferenceField>
            
            
            <NumberField source="qty" key/>
            <NumberField source="rate" key/>
            <TextField source="variant" key/>
            <DateField source="returned_at" key/>
            {/* <ReferenceManyField
                label="Products"
                reference="products"
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
            </ReferenceManyField> */}
            <ShowButton label="Show" />
            <EditButton label="Edit"/>  
            <DeleteButton label="Delete"/>   
        </Datagrid>
    </List>
);

export default customerReturnsList;

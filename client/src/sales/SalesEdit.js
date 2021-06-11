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
import CustomersReferenceInput from './CustomersReferenceInput';
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
    const UrlSource = "#/customers/"+theRecord+"/show";
    return(
    
          <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>
  
     
    )
  }
const SalesEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" key/>
            <CustomersReferenceInput 
                source="customer_id"
                reference="customers"
                label="Customer Name"
            />
            <DateInput source="sale_date" key/>
            <NumberInput source="amount" key/>
            <CheckboxGroupInput source="mode" 
            format={v =>{
                const categories = v;
                const array = categories.split(',');
                return array;
            }}  
            parse={v => { 
                const theString = v.toString();
                return theString;
            }} 
            choices={[
                { id: 'e-payment', name: 'e-payment' },
                { id: 'cash', name: 'cash' },
                { id: 'credit', name: 'credit' },
            ]} />
            <NumberInput source="amount_paid" key/>
            <NumberInput source="remaining_due" key/>
            
            <ReferenceManyField
                label="Products Sold"
                reference="productsSold"
                target="sale_id"
                sort={{ field: 'id', order: 'DESC' }}
                pagination={<Pagination />}
                addLabel={true}
                perPage = {5}
                >
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
                  <DateField source="sold_at" key/>
                    <ShowButton label="Show" />
                    <EditButton label="Edit"/>  
                    <DeleteButton label="Delete"/>   
                </Datagrid>
            </ReferenceManyField>
            <AddProductsSoldButton />
        </SimpleForm>
    </Edit>
);
export default SalesEdit;
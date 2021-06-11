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
import AddProductsButton from './AddProductsButton';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import VendorsReferenceInput from './VendorsReferenceInput';
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
    const UrlSource = "#/purchases/"+theRecord+"/show";
    return(
    
          <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>
  
     
    )
  }
const PurchasesEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" key/>
            <VendorsReferenceInput 
                    source="vendor_id"
                    reference="vendors"
                    label="Vendor Name"
                />
            <DateInput source="purchase_date" key/>
            <NumberInput source="cost" key/>
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
                label="Products"
                reference="products"
                target="purchase_id"
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
            </ReferenceManyField>
            <AddProductsButton />
        </SimpleForm>
    </Edit>
);
export default PurchasesEdit;
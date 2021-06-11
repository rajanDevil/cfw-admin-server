import * as React from "react";
import { 
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    DateInput,
    Datagrid,
    ReferenceField,
    ChipField,
    ReferenceManyField,
    NumberField,
    ShowButton,
    EditButton,
    DeleteButton,
    Pagination,
    DateField
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import AddSalesButton from './AddSalesButton';

const mystyle = {
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


const customersEdit = props => ( 
    <Edit {...props}>
        <SimpleForm>
                <TextInput source="id" disabled/>
                <TextInput source="customer_name" />
                <NumberInput source="contact_number" />
                <TextInput source="address" />
                <DateInput source="creation_date" />
                <TextInput source="social_link" />
                <ReferenceManyField
                label="Sales"
                reference="sales"
                target="sale_id"
                sort={{ field: 'id', order: 'DESC' }}
                pagination={<Pagination />}
                addLabel={true}
                perPage = {5}
                >
                <Datagrid>
                <TextField source="id" key/>
                    <ReferenceField label="Customer Name" source="customer_id" reference="customers">
                        <ChipField source="customer_name" />
                    </ReferenceField>
                    <DateField source="sale_date" key/>
                    <NumberField source="amount" key/>
                    <TextArrayField source="mode" key/>
                    <NumberField source="amount_paid" key/>
                    <NumberField source="remaining_due" key/>
                    <ShowButton label="Show" />
                    <EditButton label="Edit"/>  
                    <DeleteButton label="Delete"/>   
                </Datagrid>
            </ReferenceManyField>
            <AddSalesButton />
        </SimpleForm>
    </Edit>
);
export default customersEdit;
import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    ShowButton,
    DateField,
    NumberField,
    UrlField,
    ReferenceField,
    ReferenceManyField,
    Pagination,
    ChipField,
    DeleteButton

} from 'react-admin';

import CustomersFilter from './customersFilter';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";

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




const customersList = props => {
    
    return(
        <>
        
    <List filters={<CustomersFilter />} perPage={50} sort={{ field: 'id', order: 'DESC' }} {...props}>
        <Datagrid>
            <TextField source="id" disabled/>
            <TextField source="customer_name" />
            <NumberField source="contact_number" />
            <TextField source="address" />
            <DateField source="creation_date" />
            <UrlField source="social_link" />
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

                </Datagrid>
            </ReferenceManyField>
            <ShowButton />
            <EditButton />     
            <DeleteButton />
        </Datagrid>
        
    </List>
    
    </>
    )
}

export default customersList;
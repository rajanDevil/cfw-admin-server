import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput, DateInput, TextField } from 'react-admin';

const PurchasesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="By Vendor Name" source="vendor_id" reference="vendors" allowEmpty>
            <SelectInput optionText="vendor_name" optionValue="id"/>
        </ReferenceInput>
        
            <DateInput source="date_start" label="Date From"/>
            <DateInput source="date_end" label="Date To"/>
    </Filter>
);
export default PurchasesFilter;
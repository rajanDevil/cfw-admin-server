import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput, DateInput, TextField } from 'react-admin';

const SalesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="By Customer Name" source="customer_id" reference="customers" allowEmpty>
            <SelectInput optionText="customer_name" optionValue="id"/>
        </ReferenceInput>
        
            <DateInput source="date_start" label="Date From"/>
            <DateInput source="date_end" label="Date To"/>
    </Filter>
);
export default SalesFilter;
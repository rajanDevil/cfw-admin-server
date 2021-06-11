import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput, DateInput } from 'react-admin';

const customersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Customer Name" source="customer_name" reference="customers" allowEmpty>
            <SelectInput optionText="customer_name" />
        </ReferenceInput>
        <DateInput source="date_start" label="Date From"/>
        <DateInput source="date_end" label="Date To"/>
    </Filter>
);
export default customersFilter;
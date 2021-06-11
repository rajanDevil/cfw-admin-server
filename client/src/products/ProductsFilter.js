import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput, DateInput, TextField } from 'react-admin';

const ProductsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="By Vendor Name" source="vendor_id" reference="vendors" allowEmpty>
            <SelectInput optionText="vendor_name" optionValue="id"/>
        </ReferenceInput>
        <ReferenceInput label="By Purchase ID" source="purchase_id" reference="purchases" allowEmpty>
            <SelectInput optionText="id" optionValue="id"/>
        </ReferenceInput>
            <DateInput source="date_start" label="Date From"/>
            <DateInput source="date_end" label="Date To"/>
    </Filter>
);
export default ProductsFilter;
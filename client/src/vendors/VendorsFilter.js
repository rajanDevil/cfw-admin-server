import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

const VendorsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="By Category" source="category" reference="vendorCategories" allowEmpty>
            <SelectInput optionText="category" optionValue="id"/>
        </ReferenceInput>
        <ReferenceInput label="By Name" source="vendor_name" reference="vendors" allowEmpty>
            <SelectInput optionText="vendor_name" optionValue="vendor_name"/>
        </ReferenceInput>
    </Filter>
);
export default VendorsFilter;
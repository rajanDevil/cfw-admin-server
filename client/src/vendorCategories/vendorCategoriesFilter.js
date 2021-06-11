import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

const VendorCategoriesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Vendor Categories" source="category" reference="vendorCategories" allowEmpty>
            <SelectInput optionText="category" />
        </ReferenceInput>
    </Filter>
);
export default VendorCategoriesFilter;
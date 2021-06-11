import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

const ProductCategoriesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Product Categories" source="category" reference="productCategories" allowEmpty>
            <SelectInput optionText="category" />
        </ReferenceInput>
    </Filter>
);
export default ProductCategoriesFilter;
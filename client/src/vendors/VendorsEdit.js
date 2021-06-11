import * as React from "react";
import { 
    TextInput,
    Edit,
    SimpleForm,
    DateInput,
    Datagrid,
    TextField,
    ChipField,
    DateField,
    NumberField,
    ShowButton,
    ReferenceManyField,
    ReferenceField,
    Pagination
} from 'react-admin';
import AddPurchasesButton from './AddPurchasesButton';

import VendorCategoriesReferenceInput from './VendorCategoriesReferenceInput';
const Vendors = props => (
    <Edit {...props}>
        <SimpleForm>
                <TextInput source="id" disabled/>
                <TextInput source="vendor_name"/>
                <TextInput source="shop_name"/>
                <TextInput source="contact_number"/>
                <TextInput source="address"/>
              
                 <VendorCategoriesReferenceInput 
                    source="category"
                    reference="vendorCategories"
                    label="Vendor Categories"
                />
                {/* <ReferenceArrayInput 
                    source="category" 
                    format={v =>{
                        const categories = v;
                        const array = categories.split(',');
                        return array;
                    }}  
                    parse={v => { 
                        const theString = v.toString();
                        return theString;
                    }} 
                    reference="vendorCategories" 
                    label="Vendor Categories"
                    
                >
                    <AutocompleteArrayInput optionText="category" optionValue="id" />
                       
                </ReferenceArrayInput> */}
                <DateInput source="creation_date"/>
                <ReferenceManyField
                label="Purchases Made"
                reference="purchases"
                target="vendor_id"
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
                    <DateField source="purchase_date" key/>
                    <NumberField source="cost" key/>
                    <TextField source="mode" key/>
                    <NumberField source="amount_paid" key/>
                    <NumberField source="remaining_due" key/>
                    <ShowButton />
                </Datagrid>
            </ReferenceManyField>
            <AddPurchasesButton />
            </SimpleForm>
    </Edit>
);
export default Vendors;
import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    DateField,
    ReferenceField,
    ChipField,
    DeleteButton,
    ShowButton,
    ReferenceManyField,
    Pagination,
    NumberField
} from 'react-admin';
import VendorsFilter from './VendorsFilter'






const VendorsList = props => (
    <List filters={<VendorsFilter />} {...props}>
        <Datagrid>
            <TextField source="id" key/>
            <TextField source="vendor_name" key/>
            <TextField source="shop_name" key/>
            <TextField source="contact_number" key/>
            <TextField source="address" key/>
            <ReferenceField label="Category" source="category" reference="vendorCategories">
                <ChipField source="category" />
            </ReferenceField>
            <DateField source="creation_date" key/>
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
            <ShowButton label="Show" />
            <EditButton label="Edit"/>  
            <DeleteButton label="Delete"/>   
        </Datagrid>
    </List>
);

export default VendorsList;

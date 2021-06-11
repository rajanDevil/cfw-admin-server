import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    ShowButton,
    DeleteButton
} from 'react-admin';

import VendorCategoriesFilter from './vendorCategoriesFilter';



const vendorCategoriesList = props => {
    
    return(
        <>
        
    <List filters={<VendorCategoriesFilter />} perPage={50} sort={{ field: 'id', order: 'DESC' }} {...props}>
        <Datagrid>
            <TextField source="id" label="id" />    
            <TextField source="category" />
            <ShowButton />
            <EditButton />
            <DeleteButton />    
        </Datagrid>
        
    </List>
    
    </>
    )
}

export default vendorCategoriesList;
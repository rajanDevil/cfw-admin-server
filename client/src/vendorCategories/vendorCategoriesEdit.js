import * as React from "react";
import { 
    TextField,
    Edit,
    SimpleForm,
    TextInput
} from 'react-admin';

const vendorCategoriesEdit = props => ( 
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" disabled/>
            <TextInput source="category" />
        </SimpleForm>
    </Edit>
);
export default vendorCategoriesEdit;
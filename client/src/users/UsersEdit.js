import * as React from "react";
import { 
    TextField,
    Edit,
    SimpleForm,
    PasswordInput,
    TextInput,
   
} from 'react-admin';

const UsersEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export default UsersEdit;
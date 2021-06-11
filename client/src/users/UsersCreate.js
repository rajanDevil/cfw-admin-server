import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    required
} from 'react-admin';


const UsersCreate = props => {
    // Read the post_id from the location
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="id" disabled/>
                <TextInput
                    source="name"
                    validate={required()}
                    
                />
                <TextInput
                    source="email"
                    validate={required()}
                    
                />
                <PasswordInput
                    source="password"
                    validate={required()}
                    
                />
            </SimpleForm>
        </Create>
    );
};

export default UsersCreate;

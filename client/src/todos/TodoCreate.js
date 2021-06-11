import React from 'react';
import {
    Create,
    SimpleForm,
    required,
    TextInput
} from 'react-admin';
import { useLocation } from 'react-router';
import UsersReferenceInput from './UsersReferenceInput';
import { parse } from 'query-string';


const TodoCreate = props => {
    
     const { userID: user_id_string } = parse(props.location.search);

    let userID = user_id_string ? parseInt(user_id_string, 10) : '';

    let redirect = userID ? `/users/${userID}/show` : false;

    



    // Read the post_id from the location
    const location = useLocation();
    if(!userID){
    userID =
        location.state && location.state.record
            ? location.state.record.userID
            : undefined;
        redirect = userID ? `/users/${userID}/show` : false;
    }
    console.log(userID);
    return (
        <Create {...props}>
            <SimpleForm
                initialValues={{userID:userID }}
                redirect={redirect}
            >
                <UsersReferenceInput
                    source="userID"
                    reference="users"
                    allowEmpty
                    validate={required()}
                    perPage={10000}
                    onChange={console.log(user_id_string)}
                />
               
                <TextInput
                    source="title"
                   
                />
            </SimpleForm>
        </Create>
    );
};

export default TodoCreate;

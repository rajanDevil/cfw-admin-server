import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    ReferenceManyField,
    ShowButton,
} from 'react-admin';
import { Pagination } from 'react-admin';
import UsersFilter from './UsersFilter';

const UsersList = props => (
    <List filters={<UsersFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />

            <ReferenceManyField
                label="User Todos"
                reference="todos"
                target="userID"
                sort={{ field: 'id', order: 'DESC' }}
                pagination={<Pagination />}
                addLabel={true}
                perPage = {5}
                >
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="title" />
                    <ShowButton />
                </Datagrid>
            </ReferenceManyField>

           
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="email" />
            <ShowButton />
            <EditButton />     
        </Datagrid>
    </List>
);

export default UsersList;
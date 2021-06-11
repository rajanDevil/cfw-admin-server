import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    ReferenceField,
    ShowButton
} from 'react-admin';
import TodoFilter from './TodoFilter';

const TodoList = props => (
    <List filters={<TodoFilter />} {...props}>
        <Datagrid>
            <TextField source="id" key/>
            <ReferenceField label="User" source="userID" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
            <TextField source="userID" />
            <ShowButton />
            <EditButton />     
        </Datagrid>
    </List>
);

export default TodoList;

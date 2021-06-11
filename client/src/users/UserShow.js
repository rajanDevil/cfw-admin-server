import * as React from "react";
import { 
    Datagrid, 
    TextField,
    SimpleForm,
    ReferenceManyField,
    ShowButton,
    Show
} from 'react-admin';
import { Pagination } from 'react-admin';
import AddTodosButton from './AddTodosButton';


const UsersShow = props => (
    <Show {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="email" />
        
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
            <AddTodosButton />
        </SimpleForm>
    </Show>
  );

  export default UsersShow;
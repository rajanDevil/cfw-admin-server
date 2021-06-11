import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

const TodoFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="By User" source="userID" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
export default TodoFilter;
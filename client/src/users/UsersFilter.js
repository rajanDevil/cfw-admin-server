import * as React from "react";
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

const UsersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="users" source="userID" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
export default UsersFilter;
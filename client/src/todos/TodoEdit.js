import * as React from "react";
import { 
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    SingleFieldList,
    ChipField
} from 'react-admin';

import Chip from '@material-ui/core/Chip'

const TextArrayField = ({ record, source }) => {
  const theRecord = record[source];
  const array = theRecord.split(',');
  console.log(array);
  if (typeof array === 'undefined' || array === null || array.length === 0) {
    return <div/>
  } else {
    return (
      <>
        {array.map(item => <Chip style={{padding:5}}label={item} key={item}/>)}
      </>
    )    
  }
}
TextArrayField.defaultProps = { addLabel: true }

const TodoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />

            <TextInput source="userID" />
            <TextArrayField source="title">
                <SingleFieldList>
                    <ChipField source="title" />
                </SingleFieldList>
            </TextArrayField>
            <TextInput source="title" label="comma separated titles"/>
        </SimpleForm>
    </Edit>
);
export default TodoEdit;
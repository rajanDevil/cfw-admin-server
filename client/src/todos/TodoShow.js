import * as React from "react";
import { 
    TextField,
    SimpleForm,
    Show
} from 'react-admin';



const TodoShow = props => (
    <Show {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="userID" />
            
        </SimpleForm>
    </Show>
  );

  export default TodoShow;
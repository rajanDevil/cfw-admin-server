import * as React from "react";
import { 
    TextField,
    SimpleForm,
    Show
} from 'react-admin';



const vendorCategoriesShow = props => (
    <Show {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="category" />
            
        </SimpleForm>
    </Show>
  );

  export default vendorCategoriesShow;
import * as React from "react";
import { 
    TextField,
    SimpleForm,
    Show
} from 'react-admin';



const productCategoriesShow = props => (
    <Show {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="category" />
            
        </SimpleForm>
    </Show>
  );

  export default productCategoriesShow;
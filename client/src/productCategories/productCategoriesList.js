import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton,
    ShowButton,
    DeleteButton

} from 'react-admin';

import ProductCategoriesFilter from './productCategoriesFilter';

// const Aside = () => {
//     const { data, ids } = useListContext();   
//     return(
//     <div style={{ width: 200, margin: '1em' }}>
//             <Typography variant="h6">Posts stats</Typography>
//             <Typography variant="body2">
//                 Total sum of ids test: {ids.map(id => 
//                     data[id],
//                 ).reduce((accumulator, data) => accumulator + data.id, 0)}
//             </Typography>
//         </div>
//     )
// };


const productCategoriesList = props => {
    
    return(
        <>
        
    <List filters={<ProductCategoriesFilter />} perPage={50} sort={{ field: 'id', order: 'DESC' }} {...props}>
        <Datagrid>
            <TextField source="id" label="id" />    
            <TextField source="category" />
            <ShowButton />
            <EditButton />   
            <DeleteButton />  
        </Datagrid>
        
    </List>
    
    </>
    )
}

export default productCategoriesList;
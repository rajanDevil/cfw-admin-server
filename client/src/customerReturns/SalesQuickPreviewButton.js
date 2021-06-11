import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { 
    Button, 
    SimpleShowLayout, 
    TextField, 
    useGetOne,
    ReferenceField,
    ChipField,
    DateField,
    NumberField,
    ReferenceManyField,
    Pagination,
    Datagrid,
    ShowButton,
    EditButton,
    DeleteButton
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";

const mystyle = {
    margin: "2px"
  };

  const imgStyle = {
   width: "75px",
   height: "auto"
  };
const TextArrayField = ({ record, source }) => {
    const theRecord = record[source];
    const array = theRecord.split(',');
    console.log(array);
    if (typeof array === 'undefined' || array === null || array.length === 0) {
      return <div/>
    } else {
      return (
        <>
          {array.map(item => <Chip style={mystyle} label={item} key={item}/>)}
        </>
      )    
    }
  }
  TextArrayField.defaultProps = { addLabel: true }

const AvatarField = ({record, source})=>{
  const theRecord = record[source];
  return(
  <Avatar src={theRecord} style={imgStyle} />
  )
}
const LinkedChips = ({record, source}) =>{
  const theRecord = record[source];
  const { data } = useGetOne('products', theRecord);
  const UrlSource = "#/products/"+theRecord+"/show";
  
  console.log(data);
  return(
      
        <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>

   
  )
}


const useStyles = makeStyles({
    field: {
        // These styles will ensure our drawer don't fully cover our
        // application when teaser or title are very long
        '& span': {
            display: 'inline-block',
            maxWidth: '20em'
        }
    }
});

const SalesQuickPreviewButton = ({ id }) => {
    const [showPanel, setShowPanel] = useState(false);
    const classes = useStyles();
    const { data } = useGetOne('sales', id);

    const handleClick = () => {
        setShowPanel(true);
    };

    const handleCloseClick = () => {
        setShowPanel(false);
    };

    return (
        <>
            <Button onClick={handleClick} label="ra.action.show">
                <IconImageEye />
            </Button>
            <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
                <div>
                    <Button label="Close" onClick={handleCloseClick}>
                        <IconKeyboardArrowRight />
                    </Button>
                </div>
                <SimpleShowLayout
                    record={data}
                    basePath="/sales"
                    resource="sales"
                >
                    <TextField source="id" key/>
                    <ReferenceField label="Customer Name" source="customer_id" reference="customers">
                        <ChipField source="customer_name" />
                    </ReferenceField>
                    <DateField source="sale_date" key/>
                    <NumberField source="amount" key/>
                    <TextArrayField source="mode" key/>
                    <NumberField source="amount_paid" key/>
                    <NumberField source="remaining_due" key/>
                    <ReferenceManyField
                        label="Products Sold"
                        reference="productsSold"
                        target="sale_id"
                        sort={{ field: 'id', order: 'DESC' }}
                        pagination={<Pagination />}
                        addLabel={true}
                        perPage = {5}
                        >
                        <Datagrid>
                        <TextField source="id" key/>
                        <LinkedChips source="product_id" label="Product ID"/>
                        <ReferenceField label="Product Name" source="product_id" reference="products">
                            <ChipField source="product_name" />
                        </ReferenceField>
                        <ReferenceField label="Sale ID" source="sale_id" reference="sales">
                            <ChipField source="id" />
                        </ReferenceField>
                        
                        <ReferenceField label="Customer Name" source="customer_id" reference="customers">
                            <ChipField source="customer_name" />
                        </ReferenceField>
                        
                        
                        <NumberField source="qty" key/>
                        <NumberField source="rate" key/>
                        <TextField source="variant" key/>
                        <DateField source="sold_at" key/>
                            <ShowButton label="Show" />
                            <EditButton label="Edit"/>  
                            <DeleteButton label="Delete"/>   
                        </Datagrid>
                    </ReferenceManyField>
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default SalesQuickPreviewButton;

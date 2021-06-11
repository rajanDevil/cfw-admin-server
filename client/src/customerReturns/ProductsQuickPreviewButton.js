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
    ImageField
    
} from 'react-admin';
import Chip from '@material-ui/core/Chip';

const mystyle = {
    padding: "10px",
    margin: "2px"
  };
const imageStyle = {
    width: "10px"
}
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
  const LinkedChips = ({record, source}) =>{
    const theRecord = record[source];
    const UrlSource = "#/purchases/"+theRecord+"/show";
    return(
    
          <Chip style={mystyle} label={theRecord} component="a" href={UrlSource} clickable/>
  
     
    )
  }
  LinkedChips.defaultProps = { addLabel: true }
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

const ProductsQuickPreviewButton = ({ id }) => {
    const [showPanel, setShowPanel] = useState(false);
    const classes = useStyles();
    const { data } = useGetOne('products', id);

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
                    basePath="/products"
                    resource="products"
                >
                    <TextField source="id" key/>
                    <ReferenceField label="Vendor Name" source="vendor_id" reference="vendors">
                        <ChipField source="vendor_name" />
                    </ReferenceField>
                    <LinkedChips source="purchase_id" label="Purchase ID"/> 
                    <TextField source="product_name" key/>
                    <TextField source="description" key/>
                    <NumberField source="price" key/>
                    <ImageField source="image" style={imageStyle}/>
                    <NumberField source="purchased_qty" key/>
                    <NumberField source="stock" key/>
                    <TextArrayField source="variant" />
                    <DateField source="created_at" key/>
       
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default ProductsQuickPreviewButton;

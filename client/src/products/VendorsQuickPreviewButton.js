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
    
} from 'react-admin';

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

const VendorsQuickPreviewButton = ({ id }) => {
    const [showPanel, setShowPanel] = useState(false);
    const classes = useStyles();
    const { data } = useGetOne('vendors', id);

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
                    basePath="/vendors"
                    resource="vendors"
                >
                    <TextField source="id" key/>
                    <TextField source="vendor_name" key/>
                    <TextField source="shop_name" key/>
                    <TextField source="contact_number" key/>
                    <TextField source="address" key/>
                    <ReferenceField label="Category" source="category" reference="vendorCategories">
                        <ChipField source="category" />
                    </ReferenceField>
                    <DateField source="creation_date" key/>
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default VendorsQuickPreviewButton;

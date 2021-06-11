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
    ReferenceManyField,
    Pagination,
    Datagrid,
    NumberField,
    ShowButton 
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
                    <ReferenceManyField
                        label="Purchases Made"
                        reference="purchases"
                        target="vendor_id"
                        sort={{ field: 'id', order: 'DESC' }}
                        pagination={<Pagination />}
                        addLabel={true}
                        perPage = {5}
                        >
                        <Datagrid>
                            <TextField source="id" key/>
                            <ReferenceField label="Vendor Name" source="vendor_id" reference="vendors">
                                <ChipField source="vendor_name" />
                            </ReferenceField>
                            <DateField source="purchase_date" key/>
                            <NumberField source="cost" key/>
                            <TextField source="mode" key/>
                            <NumberField source="amount_paid" key/>
                            <NumberField source="remaining_due" key/>
                            <ShowButton />
                        </Datagrid>
                    </ReferenceManyField>
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default VendorsQuickPreviewButton;

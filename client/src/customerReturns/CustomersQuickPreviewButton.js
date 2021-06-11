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
    UrlField,
    ShowButton,
    EditButton,
    ReferenceManyField,
    Pagination,
    Datagrid,
    DeleteButton
} from 'react-admin';

import Chip from '@material-ui/core/Chip';

const mystyle = {
    margin: "2px"
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

const CustomersQuickPreviewButton = ({ id }) => {
    const [showPanel, setShowPanel] = useState(false);
    const classes = useStyles();
    const { data } = useGetOne('customers', id);

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
                    basePath="/customers"
                    resource="customers"
                >
                    <TextField source="id" disabled/>
                    <TextField source="customer_name" />
                    <NumberField source="contact_number" />
                    <TextField source="address" />
                    <DateField source="creation_date" />
                    <UrlField source="social_link" />
                    <ReferenceManyField
                        label="Sales"
                        reference="sales"
                        target="sale_id"
                        sort={{ field: 'id', order: 'DESC' }}
                        pagination={<Pagination />}
                        addLabel={true}
                        perPage = {5}
                        >
                        <Datagrid>
                        <TextField source="id" key/>
                            <ReferenceField label="Customer Name" source="customer_id" reference="customers">
                                <ChipField source="customer_name" />
                            </ReferenceField>
                            <DateField source="sale_date" key/>
                            <NumberField source="amount" key/>
                            <TextArrayField source="mode" key/>
                            <NumberField source="amount_paid" key/>
                            <NumberField source="remaining_due" key/>
                            <ShowButton label="Show" />
                            <EditButton label="Edit"/>  
                            <DeleteButton label="Delete"/>   
                        </Datagrid>
                    </ReferenceManyField>
                    <ShowButton />
                    <EditButton />     
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default CustomersQuickPreviewButton;

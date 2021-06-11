import * as React from 'react';
import { Admin, Resource, Layout } from 'react-admin';
import todos from './todos/todos'
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import jsonapiClient from './axiosProvider/axiosProvider';
import users from './users/users';
import TreeMenu from '@bb-tech/ra-treemenu';
import vendorCategories from './vendorCategories/vendorCategories';
import addUploadCapabilities from './addUploadCapabilities';
import productCategories from './productCategories/productCategories';
import vendors from './vendors/vendors';
import purchases from './purchases/purchases';
import products from './products/products';
import customers from './customers/customers';
import sales from './sales/sales';
import productsSold from './productsSold/productsSold';
import vendorReturns from './vendorReturns/vendorReturns';
import customerReturns from './customerReturns/customerReturns';
import UserIcon from '@material-ui/icons/Group';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PaymentIcon from '@material-ui/icons/Payment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const dataProvider = jsonapiClient('http://52.200.24.125:8080');
const capableDataProvider = addUploadCapabilities(dataProvider);

const App = () => (
    <Admin
        layout={(props) => <Layout {...props} menu={TreeMenu} />}
        dataProvider={capableDataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
    >
    
       <Resource icon={UserIcon} name="userTodos" options={{ "label": "Users", "isMenuParent": true  }} />
       <Resource icon={PlaylistAddCheckIcon} name="todos" options={{ "label": 'Todos',  "menuParent": "userTodos" }} {...todos}/>
       <Resource icon={PersonIcon} name="users" options={{ "label": 'Users', "menuParent": "userTodos" }} {...users}/>

       <Resource icon={CategoryIcon} name="categoryList" options={{ "label": "Category ", "isMenuParent": true }} />
       <Resource icon={StorefrontIcon} name="vendorCategories" options={{ "label": 'Vendor Categories', "menuParent": "categoryList" }} {...vendorCategories}/>
       <Resource icon={LocalMallIcon} name="productCategories" options={{ "label": 'Product Categories', "menuParent": "categoryList" }} {...productCategories}/>
       
       <Resource icon={ImportContactsIcon} name="vendorsCustomers" options={{ "label": "Contacts", "isMenuParent": true }} />
       <Resource icon={DirectionsRunIcon} name="vendors" options={{ "label": 'Vendors', "menuParent": "vendorsCustomers" }} {...vendors}/>
       <Resource icon={TransferWithinAStationIcon} name="customers" options={{ "label": 'Customers', "menuParent": "vendorsCustomers" }} {...customers}/>
       
       <Resource icon={PaymentIcon} name="purchase" options={{ "label": "Purchase ", "isMenuParent": true }} />
       <Resource icon={ShoppingCartIcon} name="purchases" options={{ "label": 'Purchases', "menuParent": "purchase" }} {...purchases}/>
       <Resource icon={ShoppingBasketIcon} name="products" options={{ "label": 'Products', "menuParent": "purchase" }} {...products}/>
       
       <Resource icon={ReceiptIcon} name="salesM" options={{ "label": "Sales ", "isMenuParent": true }} />
       <Resource icon={AccountBalanceWalletIcon} name="sales" options={{ "label": 'Sales', "menuParent": "salesM" }} {...sales}/>
       <Resource icon={LocalOfferIcon} name="productsSold" options={{ "label": 'Products Sold', "menuParent": "salesM" }} {...productsSold}/>

       <Resource icon={AssignmentReturnIcon} name="returns" options={{ "label": "Returns ", "isMenuParent": true }} />
       <Resource icon={ExitToAppIcon} name="vendorReturns" options={{ "label": 'Vendor Returns', "menuParent": "returns" }} {...vendorReturns}/>
       <Resource icon={ArrowBackIcon} name="customerReturns" options={{ "label": 'Customer Returns', "menuParent": "returns" }} {...customerReturns}/>
    </Admin>
);
export default App;

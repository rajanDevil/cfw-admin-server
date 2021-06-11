const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');


const errorHandler = require('./app/helpers/error-handler.helper');
const jwt = require('./app/helpers/jwt.helper');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(jwt.jwt());
app.use(fileUpload());
app.use(express.static('./app'));


const userRoute = require('./app/routes/user.route');
app.use('/users', userRoute);

const todoRoute = require('./app/routes/todo.route');
app.use('/todos', todoRoute);

const vendorCategoriesRoute = require('./app/routes/vendorCategories.route');
app.use('/vendorCategories', vendorCategoriesRoute);

const productCategoriesRoute = require('./app/routes/productCategories.route');
app.use('/productCategories', productCategoriesRoute);

const vendorsRoute = require('./app/routes/vendors.route');
app.use('/vendors', vendorsRoute);

const purchasesRoute = require('./app/routes/purchases.route');
app.use('/purchases', purchasesRoute);

const productsRoute = require('./app/routes/products.route');
app.use('/products', productsRoute);

const customersRoute = require('./app/routes/customers.route');
app.use('/customers', customersRoute);

const salesRoute = require('./app/routes/sales.route');
app.use('/sales', salesRoute);

const productsSoldRoute = require('./app/routes/productsSold.route');
app.use('/productsSold', productsSoldRoute);

const vendorReturnsRoute = require('./app/routes/vendorReturns.route');
app.use('/vendorReturns', vendorReturnsRoute);

const customerReturnsRoute = require('./app/routes/customerReturns.route');
app.use('/customerReturns', customerReturnsRoute);

// global error handler
app.use(errorHandler);


app.listen(8080, () => {
	console.log("Server is listening on port 8080");
});
import { fetchUtils } from 'ra-core';
import { stringify } from 'query-string';
import merge from 'deepmerge';
import axios from 'axios';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
  GET_MANY,
  GET_MANY_REFERENCE,
} from './actions';

import defaultSettings from './default-settings';
import { NotImplementedError } from './errors';
import init from './initializer';

// Set HTTP interceptors.
init();

/**
 * Maps react-admin queries to a JSONAPI REST API
 *
 * @param {string} apiUrl the base URL for the JSONAPI
 * @param {Object} userSettings Settings to configure this client.
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default (apiUrl, userSettings = {}) => (type, resource, params) => {
  let url = '';
  const settings = merge(defaultSettings, userSettings);

  const options = {
    headers: settings.headers,
  };

  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      
      const query = {
          ...fetchUtils.flattenObject(params.filter),
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
          _skip: perPage,
      };

      url = `${apiUrl}/${resource}/list?${stringify(query)}`;
      break;
    }

    case GET_ONE:{
      console.log("GetOne");
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    }
    case CREATE:{
      console.log(params.data.location);
      let formData = params.data;

      if (resource === 'users'){
        formData = new FormData();
        formData.append('name',  params.data.name );
        formData.append('email', params.data.email);
        formData.append('password', params.data.password);
      }

      if (resource === 'todos'){
        formData = new FormData();
        formData.append('title',  params.data.title );
        formData.append('userID',  params.data.userID);
      }

      if (resource === 'vendorCategories'){
        formData = new FormData();
        formData.append('category',  params.data.category );
       
      }

      if (resource === 'productCategories'){
        formData = new FormData();
        formData.append('category',  params.data.category );
       
      }

      if (resource === 'vendors'){
        formData = new FormData();
        formData.append('vendor_name',  params.data.vendor_name );
        formData.append('shop_name',  params.data.shop_name );
        formData.append('contact_number',  params.data.contact_number );
        formData.append('address',  params.data.address );
        formData.append('category',  params.data.category );
        formData.append('creation_date',  params.data.creation_date );
      }

      if (resource === 'purchases'){
        formData = new FormData();
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_date',  params.data.purchase_date );
        formData.append('cost',  params.data.cost );
        formData.append('mode',  params.data.mode );
        formData.append('remaining_due',  params.data.remaining_due );
        formData.append('amount_paid',  params.data.amount_paid );
        
      }

      if (resource === 'products'){
        formData = new FormData();
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_id',  params.data.purchase_id );
        formData.append('product_name',  params.data.product_name );
        formData.append('price',  params.data.price );
        formData.append('description',  params.data.description );
        if(params.data.myFile){
          formData.append('image',  params.data.myFile.src );
          formData.append('image_title',  params.data.myFile.title );
        }
        formData.append('purchased_qty',  params.data.purchased_qty );
        formData.append('stock',  params.data.stock );
        formData.append('variant',  params.data.variant );
        formData.append('created_at',  params.data.created_at );
      }

      if (resource === 'customers'){
        formData = new FormData();
        formData.append('customer_name',  params.data.customer_name );
        formData.append('contact_number',  params.data.contact_number );
        formData.append('address',  params.data.address );
        formData.append('creation_date',  params.data.creation_date );
        formData.append('social_link',  params.data.social_link );
      }

      if (resource === 'sales'){
        formData = new FormData();
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_date',  params.data.sale_date );
        formData.append('amount',  params.data.amount );
        formData.append('mode',  params.data.mode );
        formData.append('amount_paid',  params.data.amount_paid );
        formData.append('remaining_due',  params.data.remaining_due );
      }

      if (resource === 'productsSold'){
        formData = new FormData();
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_id',  params.data.sale_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('sold_at',  params.data.sold_at );
      }

      if (resource === 'vendorReturns'){
        formData = new FormData();
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_id',  params.data.purchase_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('returned_at',  params.data.returned_at );
      }

      if (resource === 'customerReturns'){
        formData = new FormData();
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_id',  params.data.sale_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('returned_at',  params.data.returned_at );
      }

      console.log(formData);
      url = `${apiUrl}/${resource}/add`;
      options.method = 'POST';
      options.data =formData;
      break;
    }

    case UPDATE: {
      let formData = params.data;

      if (resource === 'users'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('name',  params.data.name );
        formData.append('email', params.data.email);
        formData.append('password', params.data.password);
      }

      if (resource === 'todos'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('title',  params.data.title );
        formData.append('userID',  params.data.userID);
      }

      if (resource === 'vendorCategories'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('category',  params.data.category );
      }

      if (resource === 'productCategories'){
        formData = new FormData();
        formData.append('category',  params.data.category );
       
      }

      if (resource === 'vendors'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('vendor_name',  params.data.vendor_name );
        formData.append('shop_name',  params.data.shop_name );
        formData.append('contact_number',  params.data.contact_number );
        formData.append('address',  params.data.address );
        formData.append('category',  params.data.category );
        formData.append('creation_date',  params.data.creation_date );
      }
      if (resource === 'purchases'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_date',  params.data.purchase_date );
        formData.append('cost',  params.data.cost );
        formData.append('mode',  params.data.mode );
        formData.append('remaining_due',  params.data.remaining_due );
        formData.append('amount_paid',  params.data.amount_paid );
        
      }

      if (resource === 'products'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_id',  params.data.purchase_id );
        formData.append('product_name',  params.data.product_name );
        formData.append('price',  params.data.price );
        formData.append('description',  params.data.description );
        if(params.data.myFile){
          formData.append('image',  params.data.myFile.src );
          formData.append('image_title',  params.data.myFile.title );
        }
        formData.append('purchased_qty',  params.data.purchased_qty );
        formData.append('stock',  params.data.stock );
        formData.append('variant',  params.data.variant );
        formData.append('created_at',  params.data.created_at );
      }



      if (resource === 'customers'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('customer_name',  params.data.customer_name );
        formData.append('contact_number',  params.data.contact_number );
        formData.append('address',  params.data.address );
        formData.append('creation_date',  params.data.creation_date );
        formData.append('social_link',  params.data.social_link );
      }

      
      if (resource === 'sales'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_date',  params.data.sale_date );
        formData.append('amount',  params.data.amount );
        formData.append('mode',  params.data.mode );
        formData.append('amount_paid',  params.data.amount_paid );
        formData.append('remaining_due',  params.data.remaining_due );
      }

      if (resource === 'productsSold'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_id',  params.data.sale_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('sold_at',  params.data.sold_at );
      }

      if (resource === 'vendorReturns'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('vendor_id',  params.data.vendor_id );
        formData.append('purchase_id',  params.data.purchase_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('returned_at',  params.data.returned_at );
      }

      if (resource === 'customerReturns'){
        formData = new FormData();
        formData.append('id',  params.data.id );
        formData.append('customer_id',  params.data.customer_id );
        formData.append('sale_id',  params.data.sale_id );
        formData.append('product_id',  params.data.product_id );
        formData.append('qty',  params.data.qty );
        formData.append('variant',  params.data.variant );
        formData.append('rate',  params.data.rate );
        formData.append('returned_at',  params.data.returned_at );
      }

      
      url = `${apiUrl}/${resource}/patch`;

      options.method = settings.updateMethod;
      options.data = formData;
      break;
    }

    case DELETE: {
      url = `${apiUrl}/${resource}/delete/${params.id}`;
      options.method = 'DELETE';
      break;
    }

    case DELETE_MANY: { 
      const query = stringify({
        'id':params.ids
      }, { arrayFormat: settings.arrayFormat });  
      url = `${apiUrl}/${resource}/deleteMany?${query}`;
      options.method = 'DELETE';
      break;
    }

    case GET_MANY: {
      console.log('getMany');
      const query = stringify({
        'id': params.ids,
      }, { arrayFormat: settings.arrayFormat });

      url = `${apiUrl}/${resource}/getMany?${query}`;
      break;
    }

    case GET_MANY_REFERENCE: {
      console.log('getManyReference');
     
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      
      const query = {
          ...fetchUtils.flattenObject(params.filter),
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
          _skip: perPage,
          id: params.id
      };
      
      console.log(query);
      url = `${apiUrl}/${resource}/getMany?${stringify(query)}`;
      break;
    }

    default:
      throw new NotImplementedError(`Unsupported Data Provider request type ${type}`);
  }

  return axios({ url, ...options })
    .then((response) => {
    

      switch (type) {
        case GET_MANY:{
          return {
            data: response.data.result,
            total: response.data.total,
            
          };
        }
        case DELETE_MANY:
        case GET_LIST: {
          return {
            
            total: response.data.total,
            data: response.data.result
          };
        }

        case GET_MANY_REFERENCE: {
          return {
            data: response.data.result,
            total: response.data.total,
            
          };
        }

        case GET_ONE: {
          return {
            data: response.data.result,
            
          };
        }

        case CREATE: {
          console.log(response.data.result[0]);

          return {
            data: response.data.result[0],
          };
        }

        case UPDATE: {
          return {
            data: response.data.result,
           
          };
        }

        case DELETE: {
          return {
            data: { id: params.id },
            
          };
        }

        default: 
        throw new Error(`Unsupported fetch action type ${GET_LIST}`);
      }
    });
};

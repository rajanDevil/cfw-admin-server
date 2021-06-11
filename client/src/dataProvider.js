import { fetchUtils } from 'ra-core';
import { stringify } from 'query-string';

export default (apiUrl) => {
    const httpClient = (url) => {
        const options = {
            headers: new Headers({ Accept: 'application/json' }),
        };
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }

        return fetchUtils.fetchJson(url, options);
    };

    return {    
        getList: (resource, params) => {
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
            const url = `${apiUrl}/${resource}/list?${stringify(query)}`;
            return httpClient(url).then(({ headers, json }) => {
                console.log(json.result);
                return {
                    data: json.result,
                    total: json.total,
                };
            });
        },
        getOne: (resource, params) =>
            httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
                data: json.result,
            })),


        getMany: () => Promise.reject(),

        getManyReference: () => Promise.reject(),


        update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/update/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.result })),

        updateMany: () => Promise.reject(),
        create: () => Promise.reject(),
        delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/delete/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

        deleteMany: () => Promise.reject(),
    };
};
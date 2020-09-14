'use strict';
const {
    server
} = require('../lib/server');
const supertest = require('supertest');

const mockRequest = supertest(server);

describe('Server module', () => {
    it('Server error status code 404', () => {
        return mockRequest
            .get('/no-route').then(results => {
                expect(results.status).toBe(404);
            });
    });
    it('Server status code 200 for products route', () => {
        return mockRequest
            .get('/products').then(results => {
                expect(results.status).toBe(200);
            });
    });

    it('Check POST request for products route to send body', () => {

        let record = {
            name: 'sweet_bar',
            display_name: 'Sweet bar',
            description: 'Healthy sweet bar',
            category: 'sweet',
            id: 1,
        };
        return mockRequest
            .post('/products')
            .send(record)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(record);
            });
    });

    it('Check status code 200 for products route and get product by id', () => {
        let arr = [{
            name: 'sweet_bar',
            display_name: 'Sweet bar',
            description: 'Healthy sweet bar',
            category: 'sweet',
            id: 1,
        }];
        return mockRequest
            .get('/products/1').then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(arr);
            });
    });

    it('Check status code 200 for products route and update product by id', () => {
        let record = {
            name: 'sweet_bar',
            display_name: 'Sweet bar',
            description: 'Healthy sweet bar',
            category: 'sweet',
            id: '1',
        };
        return mockRequest
            .put('/products/1')
            .send(record)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(record);
            });
    });

    it('Check status code 200 for products route and update using patch product by id', () => {
        let record = {
            name: 'sweet_bar',
            display_name: 'Sweet bar',
            description: 'Healthy sweet bar',
            category: 'sweet',
            id: '1',
        };
        return mockRequest
            .patch('/products/1')
            .send(record)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(record);
            });
    });

    it('Check status code 200 for delete products route', () => {
        return mockRequest
            .delete('/products/1').then(results => {
                expect(results.status).toBe(200);
            });
    });

    it('Check POST request categories route will send body', () => {
        let record = {
            name: 'sweet',
            display_name: 'Sweet',
            description: 'Natural Sweet with healthy ingeriant',
            id: 1,
        };
        return mockRequest
            .post('/categories')
            .send(record)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(record);
            });
    });
    
    it('Check status code 200 for categories route', () => {
        return mockRequest
            .get('/categories').then(results => {
                expect(results.status).toBe(200);
            });
    });

    it('Check status code 200 for categories by id route', () => {
        let arr = [{
            name: 'sweet',
            display_name: 'Sweet',
            description: 'Natural Sweet with healthy ingeriant',
            id: 1,
        }];
        return mockRequest
            .get('/categories/1').then(results => {
                // console.log(results.body);
                // console.log(arr);
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(arr);
            });
    });
    
    it('Check status code 200 for categories update route', () => {
        let updatedRecord = {
            name: 'sweet',
            display_name: 'Sweet',
            description: 'Natural Sweet with healthy ingeriant',
            id: '1',
        };
        return mockRequest
            .put('/categories/1')
            .send(updatedRecord)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(updatedRecord);
            });
    });

    it('Check status code 200 for categories update using patch route', () => {
        let updatedRecord = {
            name: 'sweet',
            display_name: 'Sweet',
            description: 'Natural Sweet with healthy ingeriant',
            id: '1',
        };
        return mockRequest
            .patch('/categories/1')
            .send(updatedRecord)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(updatedRecord);
            });
    });

    it('Check status code 200) for delete categories route', () => {
        return mockRequest
            .delete('/categories/1').then(results => {
                expect(results.status).toBe(200);
            });
    });

});
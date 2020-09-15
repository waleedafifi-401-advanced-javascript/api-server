'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

jest.spyOn(console, 'log');

let productObj = {
  name: 'moon_cactus',
  display_name: 'Moon Cactus',
  description: 'One of the most buatiful cacti came with multi color (red, yellow, orange, purble, red-yellow, burgundy)',
  category: 'CACTUS',
};

let categoryObj = {
  name: 'cactus',
  display_name: 'Cactus',
  description: 'All kind of cactus only without succulents',
};

describe('Server module', () => {
  it('Server error status code 404', () => {
    return mockRequest
      .get('/no-route').then(results => {
        expect(results.status).toBe(404);
      });
  });

  it('Get products route will retrive data from DB', async () => {

    const data = await mockRequest.post('/products').send(productObj);
    console.log('data.body : ', data.body);
    const record = data.body;
    const productItemResponse = await mockRequest.get(`/products`);
    const productItem = productItemResponse.body.resutl[0];
    // console.log('allProduct: ', productItem);

    Object.keys(productObj).forEach(key => {
      expect(productItem[key]).toEqual(productObj[key]);
    });
  });

  it('Check POST request for products route to send body', () => {
    return mockRequest
      .post('/products')
      .send(productObj)
      .then(data => {
        expect(data.status).toBe(201);
        Object.keys(productObj).forEach(key => {
          expect(data.body[key]).toEqual(productObj[key]);
        });
      });
  });

  it('Check status code 200 for products route and get product by id', async () => {
    const data = await mockRequest.post('/products').send(productObj);
    const record = data.body;
    const productItemResponse = await mockRequest.get(`/products/${record._id}`);
    const productItem = productItemResponse.body;
    expect(productItemResponse.statusCode).toBe(200);
    Object.keys(productObj).forEach(key => {
      expect(productItem[0][key]).toEqual(productObj[key]);
    });

  });

  it('Check status code 200 for products route and update product by id', () => {
    let obj = {
      name: 'sweet_bar',
      display_name: 'Sweet bar',
      description: 'Healthy sweet bar',
      category: 'sweet',
    };

    return mockRequest
      .post('/products')
      .send(productObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .put(`/products/${data.body._id}`)
          .send(obj)
          .then(record => {
            expect(record.statusCode).toBe(201);
            Object.keys(productObj).forEach(key => {
              expect(record.body[key]).toStrictEqual(obj[key]);
            });
          });

      });
  });

  it('Check status code 200 for products route and update using patch product by id', () => {
    let obj = {
      name: 'sweet_bar',
      display_name: 'Sweet bar',
      description: 'Healthy sweet bar',
      category: 'sweet',
    };
    return mockRequest
      .post('/products')
      .send(productObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .patch(`/products/${data.body._id}`)
          .send(obj)
          .then(record => {
            expect(record.statusCode).toBe(200);
            Object.keys(productObj).forEach(key => {
              expect(record.body[key]).toStrictEqual(obj[key]);
            });
          });

      });

  });

  it('Check status code 200 for delete products route', () => {
    return mockRequest
      .post('/products')
      .send(productObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .delete(`/products/${data.body._id}`)
          .then(record => {
            expect(record.statusCode).toBe(200);
          });

      });
  });

  it('Check POST request categories route will send body', () => {
    return mockRequest
      .post('/categories')
      .send(categoryObj)
      .then(data => {
        expect(data.status).toBe(201);
        Object.keys(categoryObj).forEach(key => {
          expect(data.body[key]).toEqual(categoryObj[key]);
        });
      });
  });

  it('Check status code 200 for categories route', async () => {

    const data = await mockRequest.post('/categories').send(categoryObj);
    console.log('data.body : ', data.body);
    const record = data.body;
    const cateegoryItemResponse = await mockRequest.get(`/categories`);
    const categoryItem = cateegoryItemResponse.body.resutl[0];
    Object.keys(categoryObj).forEach(key => {
      expect(categoryItem[key]).toEqual(categoryObj[key]);
    });
  });

  it('Check status code 200 for categories by id route', async () => {
    const data = await mockRequest.post('/categories').send(categoryObj);
    const record = data.body;
    const caategoryItemResponse = await mockRequest.get(`/categories/${record._id}`);
    const categoryItem = caategoryItemResponse.body;
    expect(caategoryItemResponse.statusCode).toBe(200);
    Object.keys(categoryObj).forEach(key => {
      expect(categoryItem[0][key]).toEqual(categoryObj[key]);
    });
  });

  it('Check status code 200 for categories update route', () => {
    let obj = {
      name: 'succulen',
      display_name: 'Succulents',
      description: 'succulents',
    };

    return mockRequest
      .post('/categories')
      .send(categoryObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .put(`/categories/${data.body._id}`)
          .send(obj)
          .then(record => {
            expect(record.statusCode).toBe(201);
            Object.keys(categoryObj).forEach(key => {
              expect(record.body[key]).toStrictEqual(obj[key]);
            });
          });

      });
  });

  it('Check status code 200 for categories update using patch route', () => {
    let obj = {
      name: 'sweet_bar',
      display_name: 'Sweet bar',
      description: 'Healthy sweet bar',
      category: 'sweet',
    };
    return mockRequest
      .post('/categories')
      .send(categoryObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .patch(`/categories/${data.body._id}`)
          .send(obj)
          .then(record => {
            expect(record.statusCode).toBe(200);
            Object.keys(categoryObj).forEach(key => {
              expect(record.body[key]).toStrictEqual(obj[key]);
            });
          });

      });
  });

  it('Check status code 200) for delete categories route', () => {
    return mockRequest
      .post('/categories')
      .send(categoryObj)
      .then(data => {
        console.log('put update:', data.body);
        return mockRequest
          .delete(`/categories/${data.body._id}`)
          .then(record => {
            expect(record.statusCode).toBe(200);
          });

      });
  });
});

describe('500 Server error', ()=> {
  it('should respond with 500 for bad routes', async ()=>{
    const data = await mockRequest.get('/bad');
    expect(data.statusCode).toBe(500);
  });
});

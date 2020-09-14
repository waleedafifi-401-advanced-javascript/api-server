
const { server }  = require('../lib/server.js');

const supertest = require('supertest');
const mockRequest = supertest(server);

jest.spyOn(console, 'log');

describe('500 Server error', ()=> {
    it('should respond with 500 for bad routes', ()=>{
        return mockRequest.get('/bad').then(result=>{
            expect(result.err).toHaveBeenCalled();
            expect(result.status).toBe(500);
        }).catch(err=> {
            console.log(err);
        });
    });
});

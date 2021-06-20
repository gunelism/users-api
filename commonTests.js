let supertest = require('supertest'); 
const request = supertest('http://127.0.0.1:8000/'); 

module.exports = 
{
  request
}
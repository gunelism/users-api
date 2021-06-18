let supertest = require('supertest'); 
const request = supertest('http://localhost:8080/'); 

module.exports = 
{
  request
}
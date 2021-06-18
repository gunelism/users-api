const request = require('../commonTests');
const fs = require('fs');
// success
describe("Get request success", () => {

  try{
    beforeEach(function () {
      console.log("GET user content")
    });
          
    afterEach(function () {
      console.log("access")
    });

    test("GET public data", done => {
      request.request.get(`api/role/all`)
        .expect(200).then((response) =>{
        console.log("GET RESPONSE : ", response.body);
        done();
      })
    });

    test("GET user data", done => {
      const data = require('../data.json'); 

      request.request.get(`api/role/user`) 
        .set('x-access-token', `${data.accessToken}`) 
        .expect(200) 
        .then((res) => {
          expect(res.text).toBeDefined(); 
          expect(res.text).toBe("User Content."); 
          console.log("POST response body : ", res.text)
          done();
        })
    })

    //remove data.json after all tests are run
    afterAll(function (){
      console.log("data.json file is deleted!!")
      fs.unlinkSync('data.json'); 
    });
  }
  catch(err){
    console.log("Exception : ", err)
    }
})

describe("Get request error", () => {

  try{
    afterEach(function () {
      console.log("no access")
    });

    it("Should not GET user data", done => {

      request.request.get(`api/role/user`) 
        .expect(403) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("No token provided!")
          console.log("POST response body : ", res.body)
          done();
        })
    })

  }
  catch(err){
    console.log("Exception : ", err)
    }
})
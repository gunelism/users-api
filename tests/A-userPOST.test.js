const request = require('../commonTests');
const fs = require('fs');
let userID;

//success
describe("POST request success", () => {
  
  try{
    let userDetails;
    beforeEach(function () {  
        console.log("Input user details!")
        userDetails = {
          "username": "gunel1",
          "email": "gunel1@mail.com",
          "password": "gunel12"
      };
    });
    
    afterEach(function () {
      console.log("User is created with ID : ", userID)
    });

	  test("Create user data", done => {

      request.request.post(`api/auth/signup`) 
        .send(userDetails)  
        .expect(200) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("User was registered successfully!")
          userID = res.body.id;

          done();
        })
    })

    test("Login user data", done => {

      request.request.post(`api/auth/signin`) 
        .send(userDetails)  
        .expect(200) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.accessToken).toBeDefined()
          // create a file and write into it user data to be used in further steps
          let jsonContent = JSON.stringify({userId: res.body.id, accessToken: res.body.accessToken}); 
          fs.writeFile("data.json", jsonContent, 'utf8', function (err) 
          {
            if (err) {
                return console.log(err);
            }
            console.log("POST response body : ", res.body)
            done();
          });
        })
    })

  }
  catch(err){
    console.log("Exception : ", err)
  }
});

// error cases
describe("POST request error", () => {
  
  try{
    let userDetails;
    beforeEach(function () {  
        console.log("Input user details!")
    });

	  it("Should not create already existing user", done => {

      request.request.post(`api/auth/signup`) 
        .send({
          "username": "gunel1",
          "email": "gunel1@mail.com",
          "password": "gunel1"
        })  
        .expect(400) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("Failed! Username is already in use!")

          done();
        })
    })

    it("Should not create user with invalid email", done => {

      request.request.post(`api/auth/signup`) 
        .send({
          "username": "differentUsername",
          "email": "invalidemail",
          "password": "password"
        })  
        .expect(500) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("Validation error: Validation isEmail on email failed")

          done();
        })
    })

    it("Should not create user with invalid password", done => {

      request.request.post(`api/auth/signup`) 
        .send({
          "username": "validUsername",
          "email": "validEmail@mail.com",
          "password": "inva"
        })  
        .expect(400) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("Failed! The password must be between 6 and 40 characters!")

          done();
        })
    })

    it("Should not login to non existing user", done => {

      request.request.post(`api/auth/signin`) 
        .send({"username": "notRegistered", "password": "notRegistered"})  
        .expect(404) 
        .then((res) => {
          expect(res.body).toBeDefined(); 
          expect(res.body.message).toBe("User Not found.")
  
          done();
        })
    })

  }
  catch(err){
    console.log("Exception : ", err)
  }
});

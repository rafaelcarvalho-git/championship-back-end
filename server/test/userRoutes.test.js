require("../routes/userRoutes")
const { generate } = require("../utils/returnData")
const { requisicao } = require("../utils/requisicao")
const { describe, test, expect } = require("@jest/globals")

let user = {
  name: "",
  email: "",
  password: ""
}
const url = "http://localhost:3000"

describe("tests of sucess", () => {
  
  test("should sign in new user", async () => {
  
    const data = {
      name: generate(),
      email: generate() + "@gmail.com",
      password: generate()
    }
  
    user.name = data.name
    user.email = data.email
    user.password = data.password
  
    const request = await requisicao({
      method: "POST", 
      url: url+"/auth/register", 
      data: data
    })
  
    expect(request.status).toBe(201)
  })

  test("should log in", async () => {
  
    const data = {
      email: user.email,
      password: user.password
    }
  
    const request = await requisicao({ 
      method: "POST", 
      url: url+"/auth/login", 
      data: data
    })
    
    expect(request.status).toBe(200)
  
  })
})

describe("tests of failure", () => {

  test("should not sign in new user", async () => {
  // test must fail because the data is incomplete
    
    const data = {
      name: generate(),
      email: generate() + "@gmail.com",
    }

    const request = await requisicao({
      method: "POST", 
      url:url+"/auth/register", 
      data: data
    })

    expect(request.status).toBe(400)
  })

  test.only("should not sign in new user", async () => {
  // test must fail because user was already signed in

    const request = await requisicao({
      method: "POST",
      url: url+"/auth/register",
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
    
    expect(request.status).toBe(400)

  })

  test("should not log in", async () => {
  // test must fail because user is not signed    
  
    const data = {
      email: generate() + "gmail.com",
      password: generate()
    }

    const request = await requisicao({ 
      method: "POST", 
      url: url+"/auth/login", 
      data: data
    })
  
    expect(request.status).toBe(400)
  
  })

})

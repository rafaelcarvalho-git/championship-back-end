require("../routes/teamRoute")
const { requisicao } = require("../utils/requisicao")
const { describe, expect, test } = require("@jest/globals")
require("dotenv").config()

const url = "http://localhost:3000"

describe("sucess routes test", () => {
  var tokenRequest = ""
  // tests to get the token

  test("should log in", async () => {

    const data = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD
    }

    const request = await requisicao({ 
      method: "POST", 
      url: url+"/auth/login", 
      data: data
    })

    expect(request.status).toBe(200)
    tokenRequest = request.data.token

  })

  test("should get teams", async () => { 

    const request = await requisicao({
      method: "GET",
      url: url+"/teams/list",
      token: tokenRequest
    })

    expect(request.status).toBe(200)
  
  })

})

describe("failure routes test", () => {

  test("should not get teams", async () => {
  // request must fail because token is wrong

    const request = await requisicao({
      method: "GET",
      url: url+"/teams/list"
    })

    expect(request.status).toBe(400)

  })

})
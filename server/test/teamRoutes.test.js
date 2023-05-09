const { generate } = require("../utils/returnData")
const { requisicao } = require("../utils/requisicao")
const { describe, expect, test } = require("@jest/globals")

const url = "http://localhost:3000"
const user = {
  email: "thesamuelvitor@gmail.com",
  password: "1234"
}

describe.only("routes teams test", () => {
  var tokenRequest = ""
  // tests to get the token

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


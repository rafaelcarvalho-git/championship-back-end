const { generate } = require("../utils/returnData")
const { requisicao } = require("../utils/requisicao")

let user = {
  email: "",
  password: ""
}
const url = "http://localhost:3000"

// eslint-disable-next-line no-undef
test("should sign in new user", async () => {

  const data = {
    name: generate(),
    email: generate() + "@gmail.com",
    password: generate()
  }

  user.email = data.email
  user.password = data.password

  const request = await requisicao("POST", url+"/auth/register", data)

  // eslint-disable-next-line no-undef
  expect(request.status).toBe(201)
})

// eslint-disable-next-line no-undef
test("should not sign in new user", async () => {
  // test must fail because the data is incomplete

  const data = {
    name: generate(),
    email: generate() + "@gmail.com",
  }

  const request = await requisicao("POST", url+"/auth/register", data)

  // eslint-disable-next-line no-undef
  expect(request.status).toBe(400)

})

// eslint-disable-next-line no-undef
test("should log in", async () => {

  const data = {
    email: user.email,
    password: user.password
  }

  const request = await requisicao( "POST", url+"/auth/login", data)

  // eslint-disable-next-line no-undef
  expect(request.status).toBe(200)

})

// eslint-disable-next-line no-undef
test("should not log in", async () => {

  // test must fail because user is not signed

  const data = {
    email: generate() + "gmail.com",
    password: generate()
  }

  const request = await requisicao( "POST", url+"/auth/login", data)

  // eslint-disable-next-line no-undef
  expect(request.status).toBe(400)

})

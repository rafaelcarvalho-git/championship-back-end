const axios = require("axios")

exports.requisicao = function (method, url, data) {

  return axios({
    method: method,
    url: url,
    data: data,
    validateStatus: false,
  })

}
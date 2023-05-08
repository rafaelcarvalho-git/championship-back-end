const axios = require("axios")

exports.requisicao = function (requisicao) {

  return axios({
    method: requisicao.method,
    url: requisicao.url,
    data: requisicao.data,
    validateStatus: false,
    Headers: {
      Authorization: `Bearer ${requisicao.token}`
    }
  })

}
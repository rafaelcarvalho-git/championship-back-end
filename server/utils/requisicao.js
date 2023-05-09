const axios = require("axios")

exports.requisicao = function (requisicao) {

  return axios({
    method: requisicao.method,
    url: requisicao.url,
    data: requisicao.data,
    validateStatus: false,
    headers: {
      Authorization: "Bearer "+requisicao.token
    }
  })

}
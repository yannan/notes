import axios from 'axios'

export const resApi = params => {
  return axios.get(`/api/url?url=${params}`).then(res => res.data).catch(function (err) {
    console.log(err)
  })
}

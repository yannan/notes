import axios from 'axios'

const host = 'http://yannan.xyz/api/'

export const resApi = params => {
  return axios.get(`/api/sf/query?${params}`).then(res => res.data).catch(function (err) {
    console.log(err)
  })
}

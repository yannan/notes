import axios from 'axios'

const host = 'http://yannan.xyz'

export const resApi = params => {
  return axios.get(`${host}/api/sf/query?${params}`).then(res => res.data).catch(function (err) {
    console.log(err)
  })
}

export const newsApi = params => {
  return axios.get(`${host}/api/news/query?${params}`).then(res => res.data).catch(function (err) {
    console.log(err)
  })
}

export const blogApi = params => {
  return axios.get(`${host}/api/blog/query?${params}`).then(res => res.data).catch(function (err) {
    console.log(err)
  })
}

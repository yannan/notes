import axios from 'axios'

let host = 'http://yannan.xyz'

if (window.location.href.indexOf('http://localhost:8087') > -1) {
  host = ''
}

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


export const getPoetry = () => {
  return axios.get(`${host}/api/poetry`).then(res => res.data).catch(err => {
    console.log(err)
  })
}

import axios from 'axios'

const API_BASE = 'http://138.68.66.142:3333'

const getUrl = (path) => {
  return `${API_BASE}/${path}`
}

export default {
  get(path, options) {
    return axios.get(getUrl(path), options)
      .then((response) => response.data)
  },

  post(path, data, options) {
    return axios.post(getUrl(path), data, options)
      .then((response) => response.data)
  }
}

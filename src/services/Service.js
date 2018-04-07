import API from './API'

export default {
  diel(id) {
    return API.get(`diel/info?diel=${id}`)
  }
}

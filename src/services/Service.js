import API from './API'

export default {
  diel(id, lokalita) {
    return API.get(`diel/info?lokalita=${lokalita}&diel=${id}`)
  }
}


import API from './API'

export default {
  getParcelyForUzemnyDiel(lokalita, diel) {
    return API.get(`parcels?lokalita=${lokalita}&diel=${diel}`)
  }
}


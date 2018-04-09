import axios from 'axios'

const API_BASE_PYHTON = 'http://95.85.50.131:3333'
const API_BASE_RAILS = 'http://95.85.50.131:4000'

export default {
  async getParcelyForUzemnyDiel(lokalita, diel) {
    const url = `${API_BASE_PYHTON}/parcels?lokalita=${lokalita}&diel=${diel}`
    const response = await axios.get(url)

    const parcely = response.data
      .map((parcel) => {
        parcel.latLonShape = parcel.latLonShape.map(([lat, lng]) => ({lat, lng}))
        return parcel
      })

    return parcely
  },

  async getZiadostiForUzemnyDiel(lokalita, diel) {
    const url = `${API_BASE_RAILS}/diel/info?lokalita=${lokalita}&diel=${diel}`
    const response = await axios.get(url)

    const ziadosti = response.data

    return ziadosti
  },

  async loadEntity(entityId) {
    const url = `${API_BASE_RAILS}/entity/info?entity_id=${entityId}`
    const response = await axios.get(url)

    const entity = response.data

    return entity
  }
}


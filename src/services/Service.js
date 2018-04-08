import axios from 'axios'

const API_BASE_PYHTON = 'http://138.68.66.142:3333'
const API_BASE_RAILS = 'http://138.68.66.142:4000'

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
  }
}


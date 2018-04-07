import {convert4326To3857} from '../utils/converter'
import makeUrl from '../utils/makeUrl'
import axios from 'axios'

const MAP_SERVER_URL = 'https://kataster.skgeodesy.sk/eskn/rest/services/VRM/identify/MapServer'
const O_DATA_URL = 'https://kataster.skgeodesy.sk/PortalOData'

const FULL_MAP_EXTEND = [
  1854619.3926993841,
  6048067.443868125,
  2517833.7445638794,
  6396945.299809758,
].join(',')

const serializeImageDisplay = ({width, height, dpi}) => {
  return [width, height, dpi].join(',')
}

export default {
  async findParcelNumber(latLng) {
    const geometry = convert4326To3857(latLng)

    const imageDisplay = serializeImageDisplay({
      width: 1000,
      height: 1000,
      dpi: 96
    })

    const params = {
      geometry: geometry,
      tolerance: 0,
      returnGeometry: true,
      imageDisplay: imageDisplay,
      geometryType: 'esriGeometryPoint',
      sr: 102100,
      mapExtent: FULL_MAP_EXTEND,
      layers: 'visible:1',
      f: 'json'
    }

    const {data} = await axios(`${MAP_SERVER_URL}/identify`, {
      responseType: 'json',
      params
    })

    const parcel = data && data.results && data.results[0]

    if (parcel) {
      return parcel.value
    }
  },

  async getParcelData(parcelNumber) {
    const params = {
      $select: 'Id,ValidTo,No,Area,HouseNo,Extent',
      $expand: 'OwnershipType($select=Name,Code),CadastralUnit($select=Name,Code),Localization($select=Name),Municipality($select=Name),LandUse($select=Name),SharedProperty($select=Name),ProtectedProperty($select=Name),Affiliation($select=Name),Folio($select=Id,No),Utilisation($select=Name),Status($select=Code)',
      $filter: `No eq '${parcelNumber}'` // CadastralUnit/Code eq ${code} and
    }

    const response = await axios(`${O_DATA_URL}/ParcelC`, {
      responseType: 'json',
      params
    })

    const parcelData = response.value

    if (!parcelData) {
      return false
    }

    parcelData.participants = await this.getParcelParticipants(parcelNumber)

    return parcelData
  },

  async getParcelParticipants(parcelNumber) {
    const params = {

    }

    const response = await axios.get(`${O_DATA_URL}/ParcelsC(${parcelNumber})/Kn.Participants`, {
      responseType: 'json',
      params
    })

    const participants = response.value

    if (!participants) {
      return null
    }

    return participants
  },

  async getParcel(latLng) {
    const parcelNumber = await this.findParcelNumber(latLng)

    if (!parcelNumber) {
      return false
    }

    const parcelData = await this.getParcelData(parcelNumber)

    return parcelData
  }
}

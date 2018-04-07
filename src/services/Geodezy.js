import wgs84_to_jtsk from '../utils/wgs84_to_jtsk'
import makeUrl from '../utils/makeUrl'
import axios from 'axios'

const BASE_URL = 'https://kataster.skgeodesy.sk/eskn/rest/services/VRM/identify/MapServer'

const getUrl = (path, props = {}) => makeUrl(`${BASE_URL}/${path}`, props)

export default {
  async lookParcel({lat, lng}) {
    const {x, y} = wgs84_to_jtsk(lat, lng)

    const {body} = await axios(getUrl('identify'), {
      responseType: 'json',
      params: {
        geometry: {x, y},
        f: 'json'
      }
    })

    console.log(body)

    return body
  }
}

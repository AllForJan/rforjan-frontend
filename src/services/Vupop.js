import wgs84_to_jtsk from '../utils/wgs84_to_jtsk'
import makeUrl from '../utils/makeUrl'
import axios from 'axios'

const BASE_URL = 'https://portal.vupop.sk/arcgis/rest/services/LPIS/LPIS_verejnost/MapServer'

const getUrl = (path, params) => {
  return makeUrl(`${BASE_URL}/${path}`, params)
}

export default {
  getMapTile(bounds, size) {
    const convertCoordinate = ({lat, lng}) => wgs84_to_jtsk(lat, lng)
    const {width, height} = size

    const northEast = convertCoordinate(bounds.northEast)
    const southWest = convertCoordinate(bounds.southWest)
    const bbox = [-northEast.x, -northEast.y, -southWest.x, -southWest.y];

    const params = {
      dpi: '96',
      transparent: 'true',
      format: 'png32',
      layers: 'show:0,1,3,4,5,6,7,8,9,26',
      bbox: bbox.join(','),
      bboxSR: '102067',
      imageSR: '102067',
      size: `${width},${height}`,
      f: 'image'
    }

    const url = getUrl('export', params)

    return url;
  },

  lookupKulturnyDiel({lat, lng}) {
    const {x, y} = wgs84_to_jtsk(lat, lng)

    return axios.get(getUrl(''), {
      geometry: {x, y}
    })
  }
}

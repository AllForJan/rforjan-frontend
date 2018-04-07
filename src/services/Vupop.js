import {convertToJTSK} from '../utils/converter'
import {stringifyQueryParams} from '../utils/makeUrl'
import axios from 'axios'

const BASE_URL = 'http://portal.vupop.sk/arcgis/rest/services/LPIS/Kulturne_diely/MapServer'

export default {
  getMapTile(bounds, size) {
    const {width, height} = size

    const northEast = convertToJTSK(bounds.northEast)
    const southWest = convertToJTSK(bounds.southWest)
    const bbox = [-northEast.x, -northEast.y, -southWest.x, -southWest.y];

    //-371431.84653896734,-1185471.9128043288,-338292.7177607098,-1171779.6979198991
    console.log(bbox)

    const params = {
      dpi: '96',
      transparent: 'true',
      format: 'png8',
      layers: 'show:0,1,3,4,5,6,7,8,9,26',
      bbox: bbox.join(','),
      bboxSR: '102067',
      imageSR: '102067',
      size: `${width},${height}`,
      f: 'image'
    }

    const url = `${BASE_URL}/export?${stringifyQueryParams(params)}`

    return url;
  },

  // lookupKulturnyDiel({lat, lng}) {
  //   const {x, y} = wgs84_to_jtsk(lat, lng)
  //
  //   return axios.get(getUrl(''), {
  //     geometry: {x, y}
  //   })
  // }
}

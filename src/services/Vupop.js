import {convert4326To5514, convert5514To4326} from '../utils/converter'
import {stringifyQueryParams} from '../utils/makeUrl'
import axios from 'axios'

const KULTURNE_DIELY_URL = 'http://portal.vupop.sk/arcgis/rest/services/LPIS/Kulturne_diely/MapServer'
const VEREJNOST_URL = 'http://portal.vupop.sk/arcgis/rest/services/LPIS/LPIS_verejnost/MapServer'

export default {
  getMapTile(bounds, size) {
    const northEast = convert4326To5514(bounds.northEast)
    const southWest = convert4326To5514(bounds.southWest)

    const bbox = [northEast.x, northEast.y, southWest.x, southWest.y];
    const {width, height} = size

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

    const url = `${VEREJNOST_URL}/export?${stringifyQueryParams(params)}`

    return url;
  },

  async lookupKulturnyDiel(latLng) {
    const geometry = convert4326To5514(latLng)
    const mapExtent = [
      -391315.6707205146,
      -1182782.0263571497,
      -388630.1445161288,
      -1181758.0868092705
    ].join(',')

    console.log(geometry)

    const params = {
      geometry,
      mapExtent,
      geometryType: 'esriGeometryPoint',
      returnGeometry: 'true',
      imageDisplay: '1000,1000,96',
      tolerance: '5',
      f: 'json'
    }

    const response = await axios.get(`${KULTURNE_DIELY_URL}/identify`, {
      responseType: 'json',
      params
    })

    const kulturnyDiel = response.data &&
      response.data.results &&
      response.data.results[0]

    if (!kulturnyDiel) {
      return
    }

    kulturnyDiel.geometry.rings = kulturnyDiel.geometry.rings.map((ring) => {
      return ring.map((coordinates) => {
        const [x, y] = coordinates
        return convert5514To4326({x, y})
      })
    })

    return kulturnyDiel
  }
}

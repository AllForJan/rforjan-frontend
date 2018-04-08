import MapView from '../views/MapView'
import PageNotFound from '../views/PageNotFound'

export default [
  {
    path: '/',
    name: 'map',
    component: MapView
  },

  {
    path: '*',
    component: PageNotFound
  }
]

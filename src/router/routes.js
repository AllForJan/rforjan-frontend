import HomeScreen from '../views/HomeScreen'
import MapView from '../views/MapView'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  },
  {
    path: '/mapa',
    name: 'map',
    component: MapView
  }
]

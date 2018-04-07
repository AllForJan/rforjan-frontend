import HomeScreen from '../views/HomeScreen'
import MapView from '../views/MapView'
import Detail from '../components/Detail'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  },
  {
    path: '/mapa',
    name: 'map',
    component: MapView,
    children: [
      { path: ':detail', component: Detail }
    ]
  }
]

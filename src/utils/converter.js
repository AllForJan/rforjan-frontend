import proj from 'ol/proj';
import proj4 from 'proj4';

// proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0+y_0=0 +ellps=bessel +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56 +units=m +no_defs')
proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=542.5,89.2,456.9,5.517,2.275,5.516,6.96 +pm=greenwich +units=m +no_defs')
// proj4.defs("EPSG:5514", "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs");
// proj4.defs("EPSG:5514", "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485,169.5,483.8,7.786,4.398,4.103,0 +units=m +no_defs");
// proj4.defs("EPSG:5514", "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485.021,169.465,483.839,7.786342,4.397554,4.102655,0 +units=m +no_defs");

proj.setProj4(proj4)

// COnvert to Pseudo Mercator
export function convert4326To3857({lat, lng}) {
  const [x, y] = proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');
  return {x, y}
}

// convert to JTSK
export function convert4326To5514({lat, lng}) {
  const [x, y] = proj.transform([lng, lat], 'EPSG:4326', 'EPSG:5514')
  return {x, y}
}

// convert to WGS84 from JTSK
export function convert5514To4326({x, y}) {
  const [lng, lat] = proj.transform([x, y], 'EPSG:5514', 'EPSG:4326')
  return {lat, lng}
}

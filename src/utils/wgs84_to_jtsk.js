import proj from 'ol/proj';
import proj4 from 'proj4';

// proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs')
// proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=542.5,89.2,456.9,5.517,2.275,5.516,6.96 +pm=greenwich +units=m +no_defs')
// proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485,169.5,483.8,7.786,4.398,4.103,0 +pm=greenwich +units=m +no_defs')
// proj4.defs('EPSG:5514', '+proj=krovak +lat_0=49.5+lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0+y_0=0 +ellps=bessel +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56 +units=m +no_defs')
proj4.defs('EPSG:102067', '+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +units=m no_defs')
// //
proj.setProj4(proj4)
// // //
export default function wgs84_to_tjsk(lat, lng) {
  console.log('o', lat, lng)
  // const [x, y] = proj.transform([lat, lng], 'EPSG:4326', 'EPSG:102067');
  const [x, y] = proj.transform([lat, lng], 'EPSG:3857', 'EPSG:102067');
  console.log('c', x, y)
  return {x, y}
}

// function sqr(x) {
//   return x*x
// }
//
// function convert(lat, lng, height = 0) {
//   // 485,169.5,483.8,7.786,4.398,4.103,0
//   // 542.5,89.2,456.9,5.517,2.275,5.516,6.96
//   // 589,76,480
//
//   // 485.021,169.465,483.839,7.786342,4.397554,4.102655,0
//
//   var d2r = Math.PI/180
//   var a = 6378137.0
//   var f1 = 298.257223563
//
//   var dx = -570.69
//   var dy = -85.69
//   var dz = -462.84
//   var wx = 4.99821/3600*Math.PI/180
//   var wy = 1.58676/3600*Math.PI/180
//   var wz = 5.2611/3600*Math.PI/180
//   var m  = -3.543e-6
//
//   var B = lat*d2r
//   var L = lng*d2r
//   var H = height
//
//   var e2 = 1 - sqr(1-1/f1)
//   var rho = a/Math.sqrt(1-e2*sqr(Math.sin(B)))
//   var x1 = (rho+H) * Math.cos(B)*Math.cos(L)
//   var y1 = (rho+H) * Math.cos(B)*Math.sin(L)
//   var z1 = ((1-e2)*rho+H) * Math.sin(B)
//
//   var x2 = dx + (1+m)*(x1 + wz*y1 - wy*z1)
//   var y2 = dy + (1+m)*(-wz*x1 + y1 + wx*z1)
//   var z2 = dz + (1+m)*(wy*x1 - wx*y1 + z1)
//
//   a = 6377397.15508
//   f1 = 299.152812853
//   var ab = f1/(f1-1)
//   var p = Math.sqrt(sqr(x2) + sqr(y2))
//   e2 = 1-sqr(1-1/f1)
//   var th = Math.atan(z2*ab/p)
//   var st = Math.sin(th)
//   var ct = Math.cos(th)
//   var t = (z2 + e2*ab*a*(st*st*st))/(p - e2*a*(ct*ct*ct))
//
//   B = Math.atan(t)
//   H = Math.sqrt(1+t*t) * (p-a/Math.sqrt(1+(1-e2)*t*t))
//   L = 2*Math.atan(y2/(p+x2))
//
//   a = 6377397.15508
//   var e = 0.081696831215303
//   var n = 0.97992470462083
//   var rho0 = 12310230.12797036
//   var sinUQ = 0.863499969506341
//   var cosUQ = 0.504348889819882
//   var sinVQ = 0.420215144586493
//   var cosVQ = 0.907424504992097
//   var alpha  = 1.000597498371542
//   var k2 = 1.00685001861538
//
//   var sinB = Math.sin(B)
//   t = (1-e*sinB)/(1+e*sinB)
//   t = sqr(1+sinB)/(1-sqr(sinB)) * Math.exp(e*Math.log(t))
//   t = k2 * Math.exp(alpha*Math.log(t))
//
//   var sinU = (t-1)/(t+1)
//   var cosU = Math.sqrt(1-sinU*sinU)
//   var V = alpha*L
//   var sinV = Math.sin(V)
//   var cosV = Math.cos(V)
//   var cosDV = cosVQ*cosV + sinVQ*sinV
//   var sinDV = sinVQ*cosV - cosVQ*sinV
//   var sinS = sinUQ*sinU + cosUQ*cosU*cosDV
//   var cosS = Math.sqrt(1-sinS*sinS)
//   var sinD = sinDV*cosU/cosS
//   var cosD = Math.sqrt(1-sinD*sinD)
//
//   var eps = n*Math.atan(sinD/cosD)
//   rho = rho0*Math.exp(-n*Math.log((1+sinS)/cosS))
//
//   var x = rho*Math.sin(eps)
//   var y = rho*Math.cos(eps)
//
//   return {x, y}
// }
//
//
// export default (lat, lng) => {
//   console.log('o', lat, lng)
//   const {x,y} = convert(lat, lng)
//   console.log('c', x, y)
//   return {x, y}
// }

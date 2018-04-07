export default {
  async getDummyGeoJSON({lat, lng}) {
    
    const geoJSON = {
        "type":"FeatureCollection",
        "crs":{
           "type":"name",
           "properties":{
              "name":"EPSG:4326"
           }
        },
        "features":[
           {
              "type":"Feature",
              "id":2182,
              "geometry":{
                 "type":"Polygon",
                 "coordinates":[
                    [
                    ]
                 ]
              },
              "properties":{
                 "FID":2182,
                 "ROK":2016,
                 "ID_KD":93402,
                 "ID_PB":0,
                 "ZKODKD":"9003/1",
                 "VYMERA":1.28,
                 "KODKD":"399126003/1",
                 "LOKALITA":"ĂbelovĂˇ",
                 "KULTURA":"TTP",
                 "SPOSOBILOS":"spĂ´sobilĂ˝",
                 "SHAPE_Leng":544.17385454299995,
                 "SHAPE_Area":12875.398824399999
              }
           }
        ]
     };

     const N = 100;
     const MAX_RADIUS = 0.01;

     for(let i=0;i<N;i++){

        const rotation = Math.PI * 2 / N *i;
        const distance = (.5+(Math.random()/2))*MAX_RADIUS;

        geoJSON.features[0].geometry.coordinates[0].push([
            lng+Math.cos(rotation)*distance,
            lat+Math.sin(rotation)*distance/1.6,
        ]);


     }

    return geoJSON;
  }
}


import { useState, useReducer, useEffect } from 'react';
import { Map, Marker, Polyline, GoogleApiWrapper, Polygon } from 'google-maps-react';
import $ from 'jquery';
import {GOOGLE_MAPS_API_KEY} from './key';

var madaraka = [

  { lat: -1.3108257554920004, lng: 36.808661626017184 },
  { lat: -1.312830413899208, lng: 36.80865149910935 },
  { lat: -1.3134144278614805, lng: 36.80951547137628 },
  { lat: -1.313741017319574, lng: 36.810400901315326 },
  { lat: -1.313741017319574, lng: 36.810400901315326 },
  { lat: -1.3140708422858967, lng: 36.81108218240511 },
  { lat: -1.315093835705163, lng: 36.811058042523975 },
  { lat: -1.315093835705163, lng: 36.811058042523975 },
  { lat: -1.316189899617654, lng: 36.81245681452524 },
  { lat: -1.315692145882217, lng: 36.81297381031286 },
  { lat: -1.3151729400281267, lng: 36.81329768705141 },
  { lat: -1.315301938160239, lng: 36.814162010096226 },
  { lat: -1.314615759497946, lng: 36.814640095042854 },
  { lat: -1.3139727707259168, lng: 36.81490961942835 },
  { lat: -1.313072929389837, lng: 36.815491583543526 },
  { lat: -1.3129465053140499, lng: 36.81622635833154 },
  { lat: -1.3136341145297643, lng: 36.817725637929854 },
  { lat: -1.3128409612332947, lng: 36.81837871820443 },
  { lat: -1.3113717821170303, lng: 36.818276104899375 },
  { lat: -1.3102161240498096, lng: 36.819698844441156 },
  { lat: -1.3084169032109834, lng: 36.81957663159036 },
  { lat: -1.3069851196480087, lng: 36.82012613975713 },
  { lat: -1.3063105228137488, lng: 36.81902904102898 },
  { lat: -1.3058016075368912, lng: 36.817536354091686 },
  { lat: -1.3051639795293342, lng: 36.81612949784287 },
  { lat: -1.3054692786555377, lng: 36.814992090738485 },
  { lat: -1.3060080659974753, lng: 36.814037149088136 },
  { lat: -1.3064490763844678, lng: 36.81321635550907 },
  { lat: -1.3069055545531518, lng: 36.81239826294925 },
  { lat: -1.307598005577994, lng: 36.81102227091438 },
  { lat: -1.3092683919278465, lng: 36.809803577934886 },
];

/*


#Polygon_0


*/


var everythingElse = [

  { lat: 0, lng: 180 },
  { lat: 180, lng: 0 },

  { lat: 0, lng: -180 },
  { lat: -180, lng: 0 },
];
const mapStyle = [
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { "color": "#CCFFFF" }
    ]
  }, {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { "visibility": "off" }
    ]
  }, {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      { "visibility": "off" }
    ]
  }
]

const LoadingContainer = (props) => (
  <div>Fancy loading!</div>
)


const onMarkerClick = (props, marker) => {
  this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

}



function MapContainer(props) {

    const [path, setPath] = useState([]);

    const [polygon, setPolygon] = useState(null);
    const [polyline, setPolyline] = useState(null);
    


    const [pin, setPin] = useState([{
        lat: -1.3097762253207629,
        lng: 36.81468703330993
    }]);

    function _mapLoaded(mapProps, map) {
        map.setOptions({
          styles: mapStyle
        });

        //var polygon = mapProps.google.maps;
        var polygon =   new mapProps.google.maps.Polygon({
            paths: path,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            draggable: true,
            geodesic: true
          });
        //console.log(polygon);
        setPolygon(polygon);
    

        const polyline = new mapProps.google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });


          setPolyline(polyline);


      }
    







  const onMapClicked=(mapProps, map, clickEvent)=>{
      var points = path;

      var latLng = clickEvent.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();
      var newPoint = { lat, lng }
      //console.log(newPoint);
      points.push(newPoint);
      setPath(points);
      setPin(newPoint);
      console.log(path);


      //renderPolygon(map);
      renderPolyline(map);

  }


  
  const renderPolygon = (map) => {
    //  console.log(map);

  
    //Set the polygon to editable else the map will draw a new polygon
    const polygon = new props.google.maps.Polygon({
        paths: path,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        //draggable: true,
        //geodesic: true,
        editable:true,
        zIndex:5,
      });


      polygon.addListener("click", (event)=>{
        console.log(polygon);
        const vertices = polygon.getPath();
        var points = [];

        // Iterate over the vertices.
        for (let i = 0; i < vertices.getLength(); i++) {
          const xy = vertices.getAt(i);

          var coord = {
            lat:xy.lat(),
            lng:xy.lng()
        }
          points.push(coord);
          
        }
        console.log(points);


      });




      polygon.setMap(map);
  
    
  }


  const renderPolyline = (map)=>{
   // console.log(map);
    const polyline = new props.google.maps.Polyline({
        path: path,
        geodesic: false,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        editable:true,
      });
      polyline.setMap(map);
      console.log(polyline);

  }

  return <div style={props.style}>
    <Map google={props.google}
      initialCenter={{
        lat: -1.3097762253207629,
        lng: 36.81468703330993
      }}
      zoom={16}
      disableDefaultUI

      className='map'
      style={{
       width: '100%',
      height: '100%',
      }}
      onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
      
      onClick={onMapClicked}
      />




  </div>

}



export default GoogleApiWrapper(
  (props) => ({
    apiKey: (GOOGLE_MAPS_API_KEY),
    LoadingContainer: LoadingContainer
  }
  ))(MapContainer);


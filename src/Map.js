
import { useState, useReducer, useEffect } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import $ from 'jquery';
import {GOOGLE_MAPS_API_KEY} from './key';

var madaraka = [

  { lat: -1.3065763319021457, lng: 36.81770935186767 },
  { lat: -1.306334597529106, lng: 36.81913194768522 },
  { lat: -1.3067793301502337, lng: 36.81935291386413 },
  { lat: -1.307454274309347, lng: 36.81923694674683 },
  { lat: -1.3090945616935266, lng: 36.81845579179382 },
  { lat: -1.3110780809015639, lng: 36.81685924530029 },
  { lat: -1.3121562455690325, lng: 36.81592264183427 },
  { lat: -1.3125908486061297, lng: 36.814771461647055 },
  { lat: -1.3136531227535961, lng: 36.81223306687927 },
  { lat: -1.3105776348589673, lng: 36.811047017974865 },
  { lat: -1.3097117069889457, lng: 36.81037595320127 },
  { lat: -1.3084303440142222, lng: 36.809527350112916 },
  { lat: -1.3068812275821378, lng: 36.8122879753189 },
  { lat: -1.3061924773946432, lng: 36.81360391490553 },
  { lat: -1.3054179186079078, lng: 36.81522026190185 },
  { lat: -1.3052141236212922, lng: 36.81603565344238 },
  { lat: -1.3054393707107985, lng: 36.81693687567138 },
];


madaraka = [

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
      { "visibility": "on" }
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

function _mapLoaded(mapProps, map) {
  map.setOptions({
    styles: mapStyle
  })
}


function MapContainer(props) {

  const dropPin = (pin) => {
    //console.log(pin);
    return {
      type: 'LOAD_PIN',
      pin: pin,
    };
  }

  const [pin, setPin] = useState({
    lat: -1.3087762253207629,
    lng: 36.81468703330993
  });


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
      onReady={(mapProps, map) => _mapLoaded(mapProps, map)}>
      

      <Polygon
        fillColor="#000000"
        fillOpacity={0.1}
        paths={[madaraka]}
        //Boundary color
        strokeColor="#0000FF"
        strokeOpacity={1}
        strokeWeight={2}
        onClick={(t, map, coord) => {

          const { latLng } = coord;
          const lat = latLng.lat();
          const lng = latLng.lng();
          var pin = {
            Lat: lat,
            Lng: lng

          }

          //setPin()

        }}
      />
      <Polygon
        paths={[everythingElse, madaraka]}
        strokeColor="#FFC107"
        strokeOpacity={0.8}
        strokeWeight={0.1}
        fillColor="#CCCCCC"
        fillOpacity={0.1}
      />
    </Map>

  </div>

}



export default GoogleApiWrapper(
  (props) => ({
    apiKey: (GOOGLE_MAPS_API_KEY),
    LoadingContainer: LoadingContainer
  }
  ))(MapContainer);
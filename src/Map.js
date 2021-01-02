
import { useState, useReducer, useEffect } from 'react';
import { Map, Marker, Polyline, GoogleApiWrapper, Polygon } from 'google-maps-react';
import $, { event } from 'jquery';

import { usePersistedReducer, mapReducer, initialState, loadDestination, loadOrigin, loadPoints, loadKey } from "./reducer";


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
    ];

    const [state, dispatch] = usePersistedReducer(mapReducer, initialState);

    const [mapCenter, setMapCenter] = useState({
        lat: -1.3097762253207629,
        lng: 36.81468703330993
    });
    const [path, setPath] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const [stroke, setStroke] = useState(1);

    const [color, setColor] = useState('');

    const [message, setMessage] = useState('');

    const [drawPolygon, setDrawPolygon] = useState(false);
    const [drawPolyline, setDrawPolyline] = useState(false);

    const [destination, setDestination] = useState(mapCenter);
    const [origin, setOrigin] = useState(mapCenter);
    const [themap, setTheMap] = useState();



    

    function _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyle
        });
        setTheMap(map);

        //var res = decodePolyline('a~l~Fjk~uOwHJy@P');
        //console.log(res);

        //console.log(props);


    }








    const onMapClicked = (mapProps, map, clickEvent) => {
        var points = path;

        var latLng = clickEvent.latLng;
        const lat = latLng.lat();
        const lng = latLng.lng();
        var newPoint = { lat, lng }
        console.log(map);
        points.push(newPoint);
        setPath(points);
        if (drawPolygon) {
            renderPolygon(map);

        } else if (drawPolyline) {
            renderPolyline(map);
        }


    }



    const renderPolygon = () => {
        //  console.log(map);


        //Set the polygon to editable else the map will draw a new polygon
        const polygon = new props.google.maps.Polygon({
            paths: path,
            strokeColor: color,
            strokeOpacity: opacity,
            strokeWeight: stroke,
            fillColor: color,
            fillOpacity: opacity,
            //draggable: true,
            //geodesic: true,
            editable: true,
            zIndex: 5,
        });


        polygon.addListener("click", (event) => {
            console.log(polygon);
            const vertices = polygon.getPath();
            var points = [];

            // Iterate over the vertices.
            for (let i = 0; i < vertices.getLength(); i++) {
                const xy = vertices.getAt(i);

                var coord = {
                    lat: xy.lat(),
                    lng: xy.lng()
                }
                points.push(coord);

            }
            console.log(points);
            setPath(points);

        });




        polygon.setMap(themap);


    }


    const renderPolyline = () => {
        const polyline = new props.google.maps.Polyline({
            path: path,
            geodesic: false,
            strokeColor: color,
            strokeOpacity: opacity,
            strokeWeight: stroke,
            fillColor: color,
            fillOpacity: opacity,
            editable: true,
        });
    
        polyline.setMap(themap);
        //console.log(polyline);

    }


    function decodePolyline(encoded) {
        if (!encoded) {
            return [];
        }
        var poly = [];
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;

        while (index < len) {
            var b, shift = 0, result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
            lng += dlng;

            var p = {
                lat: lat / 1e5,
                lng: lng / 1e5,
            };
            poly.push(p);
        }
        return poly;
    }

    const getRoute = () => {
        // console.log(map);
        console.log(props.google.maps.DirectionsService)

        var destinationN = `${destination.lat},${destination.lng}`;

        var originN = `${origin.lat},${origin.lng}`;

        const DirectionsService = new props.google.maps.DirectionsService();

        DirectionsService.route(
            {//-1.307094715669858,36.81960084022521
                origin: new props.google.maps.LatLng(origin.lat, origin.lng),
                destination: new props.google.maps.LatLng(destination.lat, destination.lng),
                travelMode: props.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === props.google.maps.DirectionsStatus.OK) {
                    //console.log(result);
                    var startpoint = result.routes[0].legs[0].start_address;
                    var endpoint = result.routes[0].legs[0].end_address;
                    var duration = result.routes[0].legs[0].duration.text;
                    var distance = result.routes[0].legs[0].distance.text;
                    //console.log(result.routes[0].legs[0]); 
                   // var coord = decodePolyline(result.routes[0].overview_polyline);
                    var pathPoints = [];
                    result.routes[0].overview_path.map((path) => {

                        const lat = path.lat();
                        const lng = path.lng();
                        var pin = {
                            lat,
                            lng
                        }
                        pathPoints.push(pin);
                    });
                    setPath(pathPoints);
                    //console.log(pathPoints)

                    const polyline = new props.google.maps.Polyline({
                        path: pathPoints,
                        geodesic: false,
                        strokeColor: color,
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        editable: true,
                    });

                    setMessage(`It will take ${duration} to drive from ${startpoint} to ${endpoint}, The total distance is ${distance}.`);
                    setTimeout(()=>{
                        setMessage('');                       
                    },180000);

                    polyline.setMap(themap);

                    // console.log(coord);
                } else {

                    setMessage(`Could not fetch route`);
                    setTimeout(()=>{
                        setMessage('');                       
                    },18000);
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    return <div style={props.style}>
        <Map google={props.google}
            initialCenter={mapCenter}
            zoom={16}
            disableDefaultUI

            className='map'
            style={{
                width: '100%',
                height: '100%',
            }}
            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}

            onClick={onMapClicked}
        >


            <Marker
                title={'Destination'}
                position={destination}

                draggable

                onDragend={(event) => {
                    console.log(event);
                }}

                onClick={(t, map, coord) => {

                    const { latLng } = coord;
                    const lat = latLng.lat();
                    const lng = latLng.lng();
                    var pin = {
                        lat,
                        lng
                    }
                    setDestination(pin);

                    setMessage('End point has been saved successfully');
                   
                    console.log(pin);


                }}
            />


            <Marker
                title={'Origin'}
                draggable
                onDragend={(event) => {

                }}

                position={origin}

                onClick={(t, map, coord) => {

                    const { latLng } = coord;
                    const lat = latLng.lat();
                    const lng = latLng.lng();
                    var pin = {
                        lat,
                        lng
                    }

                    setOrigin(pin);
                    setMessage('Start point has been saved successfully');
                    


                    console.log(pin);


                }}

            />
        </Map>

        <div className='messageModal'>
            {message}
        </div>

        <div className='coordinates'>
            <span className='title'>
                Coordinates
            </span>
            <div className='content'>
            {
    path.map((coord,index)=>{
        return <span>{`{latitude:${coord.lat},longitude:${coord.lat}}`}</span>
    })
}
            </div>
            <span className='controls' onClick={()=>{
                $('.coordinates').fadeOut();
                
            }}> 
       
Done
            </span>
        

        </div>

        <div className="controls">
            <input placeholder="Colour" type="color" onChange={(event) => {
                console.log(event.target.value);
                setColor(event.target.value);
            }} />



            <div>
                <label for="opacity">Opacity:</label>
                <input type="range" id="opacity" name="vol" min="10" max="100" onChange={(event) => {
                    var stroke = (event.target.value) / 100;
                    console.log(stroke);
                    setOpacity(stroke);
                }} />
            </div>
            <div>
                <label for="stroke">Stroke :</label>
                <input type="range" id="stroke" name="vol" min="10" max="1000" onChange={(event) => {
                    var stroke = (event.target.value) / 100;
                    console.log(stroke);
                    setStroke(stroke);
                }} />
            </div>



            <span onClick={() => {
                if (path.length>0) {
                    $('.coordinates').css({
                        display:'flex'
                    });
                    
                }else{
                    setMessage('You may draw a polygon/polyine or set a starting point and ending point to find the pathway.');
                    setTimeout(()=>{
                        setMessage('');
                    },10000);
                }

            }}>
                Show Coordinates
            </span>



            <span onClick={() => {
                if (origin == mapCenter) {
                    console.log('Origin has not been set');
                    setMessage('Drag the marker to the startpoint then click it to save');
                    setTimeout(()=>{
                        setMessage('');
                       
                    },10000);
                    return
                } else if (destination == mapCenter) {
                    console.log('Destination has not been set')
                    setMessage('Drag the marker to the endpoint then click it to save');
                    setTimeout(()=>{
                        setMessage('');                       
                    },10000);
                    return
                } else {
                    getRoute();
                }
            }}>
                Find Route
            </span>
            <span onClick={() => {
                setPath([]);
                setDrawPolygon(!drawPolyline);
                setMessage('Press two different Points on the map then adjust')
                setTimeout(()=>{
                    setMessage('');
                   
                },10000);
           
           }}>
                Draw Polygon
            </span>

            <span onClick={() => {
                setPath([]);
                setMessage('Press two different Points on the map then adjust');
                setDrawPolyline(!drawPolyline);

                setTimeout(()=>{
                    setMessage('');
                   
                },10000);

                if(!drawPolyline){

                }
            }}>
                Draw Polyline
            </span>

            <span onClick={() => {
        
            window.location.reload();
            }}>
                Refresh Map
            </span>



        </div>

    </div>

}



export default GoogleApiWrapper(
    (props) => ({

        apiKey: (props.apiKey),
        LoadingContainer: LoadingContainer
    }
    ))(MapContainer);


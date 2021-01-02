
import createPersistedReducer from 'use-persisted-reducer';

const usePersistedReducer = createPersistedReducer('0yah-google-maps');

const directionsURL = 'https://maps.googleapis.com/maps/api/directions/';
const initialState = {
    apiKey: null,
    apiSet:false,
    origin: {},
    destination: {},
    drawPolygon: false,
    drawPolyline: false,
    drawCircle: false,
    points: [],
    color: null,


}


const mapReducer = (state, action) => {

    switch (action.type) {
        case 'LOAD_API_KEY':
            return {
                ...state,
                apiKey: action.apiKey,
                apiSet:action.apiSet,

            };

        case 'DRAW_POLYGON':
            return {
                ...state,
                drawPolygon: action.status

            };

        case 'DRAW_POLYLINE':
            return {
                ...state,
                drawPolyline: action.status

            };

        case 'DRAW_CIRCLE':
            return {
                ...state,
                drawCircle: action.status

            };


        case 'LOAD_ORIGIN':
            return {
                ...state,
                origin: action.origin

            };


        case 'LOAD_DESTINATION':
            return {
                ...state,
                destination: action.destination

            };

        case 'LOAD_POINTS':
            return {
                ...state,
                points: action.points

            };

        default:
            return state;
    }

}

const drawPolygon = (status) => {
    return {
        type: 'DRAW_POLYGON',
        status: status
    };
}

const drawPolyline = (status) => {
    return {
        type: 'DRAW_POLYLINE',
        status: status
    };
}

const drawCircle = (status) => {
    return {
        type: 'DRAW_CIRCLE',
        status: status
    };
}

const loadOrigin = (origin) => {
    return {
        type: 'LOAD_ORIGIN',
        origin: origin
    };
}


const loadDestination = (destination) => {
    return {
        type: 'LOAD_DESTINATION',
        destination: destination
    };
}


const loadKey = (apiKey,apiSet) => {
    return {
        type: 'LOAD_API_KEY',
        apiKey: apiKey,
        apiSet:apiSet
    };
}

const loadPoints = (points) => {
    return {
        type: 'LOAD_POINTS',
        points: points
    };
}


export {loadDestination,loadKey,loadOrigin,loadPoints,drawCircle,drawPolygon,drawPolyline,mapReducer,usePersistedReducer,initialState,directionsURL};
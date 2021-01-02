
import './App.css';
import Map from './Map';
import $, { event } from 'jquery';

import { useState, useReducer, useEffect } from 'react';
import { usePersistedReducer, mapReducer, initialState, loadDestination, loadOrigin, loadPoints, loadKey } from "./reducer";

var mapStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  zIndex: '0',


}

//
const App = () => {


  const [state, dispatch] = usePersistedReducer(mapReducer, initialState);

  const [key, setKey] = useState(state.apiKey);

  useEffect(() => {
    
    console.log(state);
    if(state.apiKey != null && state.apiSet){
      $('.myMap').css({
        filter:'blur(0px)'
      });

      $('.myApiKey').fadeOut();
    }
  }, []);
  return (
    <div >

      <div className="layout">

      <div className='delete' onClick={() => {
                dispatch(loadKey(null,false));
                window.location.reload();

                }}>
                Delete API Key
      </div>
        <div className="myMap">
          <Map style={mapStyle} apiKey={key} />

        </div>

    <div className='myApiKey'>
      <input placeholder="Your Google API Key..." value={key} type='password' onChange={(event)=>{
          console.log(event.target.value);

          setKey(event.target.value);

      }}/>
      <span className="accept" onClick={()=>{
        if(key !='' || key != null){
          dispatch(loadKey(key,true));
          window.location.reload();
        }

      }}>
        Proceed
      </span>
      <ul>
        <li>Enable Directions API</li>
        <li>Enable Distance Matrix API</li>
        <li>Enable Maps Javascript API</li>
      </ul>

      <span className='info'>
        If the key is wrong the map will not be displayed.
        The API Key will be stored in your browser for future visits. To delete it,clear this site's data and cookies 
      </span>

    </div>



      </div>
    </div>
  );
}

export default App;

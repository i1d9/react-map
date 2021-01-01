
import './App.css';
import Map from './Map';
var mapStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  zIndex: '0',


}
const App = () => {
  return (
    <div >

      <div className="layout">

        <div className="myMap">
          <Map style={mapStyle} />

        </div>

        <div className="controls">
          <form>
            <input placeholder="Your Google Maps API Key" />
            <div>

              <input type="radio" id="Route" name="controls" value="male" />
              <label for="Route">Find Route</label><br />

              <input type="radio" id="Polygon" name="controls" value="male" />
              <label for="Polygon">Draw Polygon</label><br />
              <input type="radio" id="Polyline" name="controls" value="female" />
              <label for="Polyline">Draw Polyline</label><br />

              <input type="radio" id="Route" name="controls" value="male" />
              <label for="Route">Find Route</label><br />

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

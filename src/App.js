
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
            <input placeholder="Your API Key" />
            <input type="radio" id="male" name="gender" value="male"/>
<label for="male">Male</label><br/>
<input type="radio" id="female" name="gender" value="female"/>
<label for="female">Female</label><br/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

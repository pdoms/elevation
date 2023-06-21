import {RenderMap} from './app/rendermap'

function App() {
  return (
    <>
      <div>      
      <RenderMap/>
        <div>Marker icons created by Vector Stall - <a href="https://www.flaticon.com/free-icons/marker" title="marker icons">Flaticon</a> </div>
        <div>Elevation Api:<a href="https://www.opentopodata.org/api/" title="elevation source"> opentopdata</a> </div>
        <div>Elevation Dataset: <a href="https://www.opentopodata.org/api/" title="dataset used">ASTER</a> [global data, most up-to-date and sufficiently accurate]</div>
      </div>
    </>
  )
}

export default App

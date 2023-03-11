import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import parseLatLong from './parseLatLong';

//  41° 1'0.18"K  28°59'6.55"D
function CoordinateForm(props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCoordinate = parseLatLong(input);
    console.log(parsedCoordinate);
    props.getInput(input)
    props.addCoordinate(parsedCoordinate);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter coordinates:
        <input type="text" value={input} onChange={handleInputChange} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}


function InputedCoord(props){
 return(
  <ul>
    <li>
      Inputed: {props.input}
    </li>
  </ul>
 )

}

function CoordinateList(props) {
  return (
    <ul>
      {props.coordinates.map((coord, index) => (
        <li key={index}>
        Latitude: {coord[0]}, Longitude: {coord[1]}
        </li>      
      ))}
    </ul>
  );
}



function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [input, getInp] = useState([])

  const getInput = (inp) =>{
    getInp(inp)
  }

  const addCoordinate = (coordinate) => {
    setCoordinates((prevCoordinates) => {
      // filter out the new coordinate from the current list of coordinates
      const filteredCoordinates = prevCoordinates.filter(
        (prevCoordinate) => prevCoordinate[0] !== coordinate[0] && prevCoordinate[1] !== coordinate[1]
      );
      // return the filtered list with the new coordinate appended
      return [...filteredCoordinates, coordinate];
    });
  };

  return (
    <div>
      <h1>Coordinate Converter</h1>
      <CoordinateForm addCoordinate={addCoordinate} getInput ={getInput} />
      <InputedCoord input={input}  />
      <CoordinateList coordinates={coordinates} />
    </div>
  );
}


export default App;

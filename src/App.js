
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import parseLatLong from './parseLatLong';


function CoordinateForm(props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCoordinate = parseLatLong(input);
    console.log(parsedCoordinate);
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
    {props.coordinates.map((coord, index) => (
        <li key={index}>
       Inputed: {coord[2]}
        </li>      
      ))}
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
      <h1>Coordinate List</h1>
      <CoordinateForm addCoordinate={addCoordinate} />
      <InputedCoord coordinates={coordinates} />
      <CoordinateList coordinates={coordinates} />
    </div>
  );
}


export default App;

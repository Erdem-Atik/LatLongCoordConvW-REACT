
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
    setCoordinates([...coordinates, coordinate]);
  };

  return (
    <div>
      <h1>Coordinate List</h1>
      <CoordinateForm addCoordinate={addCoordinate} />
      <CoordinateList coordinates={coordinates} />
    </div>
  );
}


export default App;

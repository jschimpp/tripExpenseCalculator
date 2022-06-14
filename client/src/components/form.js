/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addTripAsync } from '../redux/tripSlice';

function Form() {
  const [destination, setDestination] = useState();
  const [airfare, setAirfare] = useState(0);
  const [lodging, setLodging] = useState(0);
  const [food, setFood] = useState(0);
  const [attractions, setAttractions] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (destination && airfare && lodging && food && attractions) {
      dispatch(
        addTripAsync({
          destination,
          airfare: Number(airfare),
          lodging: Number(lodging),
          food: Number(food),
          attractions: Number(attractions),
        }),
      );
    }
    setDestination('');
    setAirfare(0);
    setLodging(0);
    setFood(0);
    setAttractions(0);
    navigate('/');
  };

  return (
    <div className="bg-gray-400 w-1/3 mt-5 mx-auto my-auto text-center">
      <form>
        <p>
          Destination:
          <input
            value={destination}
            onChange={(event) => { setDestination(event.target.value); }}
          />
        </p>
        <p>
          Airfare:
          <input
            value={airfare}
            onChange={(event) => { setAirfare(event.target.value); }}
          />
        </p>
        <p>
          Lodging:
          <input
            value={lodging}
            onChange={(event) => { setLodging(event.target.value); }}
          />
        </p>
        <p>
          Food:
          <input
            value={food}
            onChange={(event) => { setFood(event.target.value); }}
          />
        </p>
        <p>
          Attractions:
          <input
            value={attractions}
            onChange={(event) => { setAttractions(event.target.value); }}
          />
        </p>
        <button type="button" className="btn" onClick={submit}>Submit</button>
      </form>
      <button type="button" className="btn"><Link to="/">Cancel</Link></button>
    </div>
  );
}

export default Form;

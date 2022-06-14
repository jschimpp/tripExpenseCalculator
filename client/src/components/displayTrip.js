/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable func-names */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { editTripAsync } from '../redux/tripSlice';

const DisplayTrip = function () {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [airfare, setAirfare] = useState(0);
  const [lodging, setLodging] = useState(0);
  const [food, setFood] = useState(0);
  const [attractions, setAttractions] = useState(0);

  const { id } = useParams();
  const posts = useSelector((state) => state.trips.posts);
  const postToDisplay = posts.filter((item) => item._id === id);
  const totalExpense = Number(postToDisplay[0].airfare) + Number(postToDisplay[0].lodging)
  + Number(postToDisplay[0].food) + Number(postToDisplay[0].attractions);

  const submitEdit = (e) => {
    e.preventDefault();
    dispatch(
      editTripAsync({
        id: postToDisplay[0]._id,
        airfare,
        lodging,
        food,
        attractions,
      }),
    );
    setEditMode(false);
  };

  if (editMode === true) {
    return (
      <div>
        <div>
          <Link to="/">Back</Link>
          <div className="bg-gray-400 text-center w-1/3 my-auto mx-auto mt-24 rounded">
            <h3>
              Destination:
              {postToDisplay[0].destination}
            </h3>
            <p>
              Airfare:
              <input value={airfare} onChange={(e) => setAirfare(e.target.value)} />
            </p>
            <p>
              Lodging:
              <input value={lodging} onChange={(e) => setLodging(e.target.value)} />
            </p>
            <p>
              Food:
              <input value={food} onChange={(e) => setFood(e.target.value)} />
            </p>
            <p>
              Attractions:
              <input value={attractions} onChange={(e) => setAttractions(e.target.value)} />
            </p>
            <button type="button" className="btn" onClick={submitEdit}>Submit</button>
            <button type="button" className="btn" onClick={() => { setEditMode(false); }}>Cancel Edit</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Link className="underline" to="/">Back to List</Link>
      <div className="bg-gray-400 text-center w-1/3 mx-auto mt-24 py-4 rounded">
        <h3 className="text-lg font-bold">
          Destination:&nbsp;
          {postToDisplay[0].destination}
        </h3>
        <p>
          Airfare:&nbsp;
          $
          {postToDisplay[0].airfare}
        </p>
        <p>
          Lodging:&nbsp;
          $
          {postToDisplay[0].lodging}
        </p>
        <p>
          Food:&nbsp;
          $
          {postToDisplay[0].food}
        </p>
        <p>
          Attractions:&nbsp;
          $
          {postToDisplay[0].attractions}
        </p>
        <p className="font-bold">
          Total:&nbsp;
          $
          {totalExpense}
        </p>
        <button type="button" className="btn" onClick={() => { setEditMode(true); }}>Edit Trip</button>
      </div>
    </div>
  );
};

export default DisplayTrip;

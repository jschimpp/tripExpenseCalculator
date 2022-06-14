/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTripAsync } from '../redux/tripSlice';

function Trip({ data }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTripAsync({ id: data._id }));
  };

  return (
    <div className="bg-gray-400 border-2 my-2 w-1/3 mx-auto rounded-md border-black text-center">
      <Link to={`/trips/${data._id}`}><p className="hover:font-bold">{data.destination}</p></Link>
      <button type="button" className="btn" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Trip;

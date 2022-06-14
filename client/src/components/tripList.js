/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsAsync } from '../redux/tripSlice';
import Trip from './trip';

function TripList() {
  const posts = useSelector((state) => state.trips.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  return (
    <div className="list-none">
      {posts.map((item) => (
        <Trip
          data={item}
        />
      ))}
    </div>
  );
}

export default TripList;

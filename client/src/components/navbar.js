/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="text-center">
      <Link to="/addtrip"><button type="button" className="btn">Add Trip</button></Link>
    </div>
  );
}

export default Navbar;

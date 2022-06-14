/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/form';
import TripList from './components/tripList';
import DisplayTrip from './components/displayTrip';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="bg-background min-h-screen">
      <div className="text-center text-3xl">Trip Expense Calculator</div>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Form />} path="/addtrip" />
          <Route element={<TripList />} path="/" />
          <Route element={<DisplayTrip />} path="/trips/:id" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

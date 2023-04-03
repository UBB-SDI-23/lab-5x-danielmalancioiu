import { useState } from 'react'
import './App.css'
import React from 'react'
import { AllBookings } from './components/booking/BookingShowAll'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppHome } from './components/AppHome'
import { AppMenu } from './components/AppMenu'
import { BookingDetails } from './components/booking/BookingDetails'
import { BookingAdd } from './components/booking/BookingAdd'
import { BookingDelete } from './components/booking/BookingDelete'
import { BookingEdit } from './components/booking/BookingEdit'
import { AllFlights } from './components/flight/FlightShowAll'
import { FlightDetails } from './components/flight/FlightDetails'
import { FlightDelete } from './components/flight/FlightDelete'
import { FlightAdd } from './components/flight/FlightAdd'
import { AllAirlines } from './components/airline/AirlineShowAll'
import { AirlineDetails } from './components/airline/AirlineDetails'
import { AirlineDelete } from './components/airline/AirlineDelete'
import { AirlineAdd } from './components/airline/AirlineAdd'
import { AirlineEdit } from './components/airline/AirlineEdit'
import { AllPassengers } from './components/passenger/PassengerShowAll'
import { PassengerAdd } from './components/passenger/PassengerAdd'
import { PassengerEdit } from './components/passenger/PassengerEdit'
import { PassengerDetails } from './components/passenger/PassengerDetails'
import { PassengerDelete } from './components/passenger/PassengerDelete'


function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <Router>
        <AppMenu />
        <Routes>
          {/* Booking */}
          <Route path="/" element={<AppHome />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/bookings/:bookingId/details" element={<BookingDetails />} />
          <Route path="/bookings/:bookingId/edit" element={<BookingEdit />} />
          <Route path="/bookings/:bookingId/delete" element={<BookingDelete />} />
          <Route path="/bookings/add" element={<BookingAdd />} />

          {/* Flight */}
          <Route path="/flights" element={<AllFlights />} />
          <Route path="/flights/:flightId/details" element={<FlightDetails />} />
          <Route path="/flights/:flightId/delete" element={<FlightDelete />} />
          <Route path="/flights/add" element={<FlightAdd />} />

          {/* Ailrine */}
          <Route path="/airlines" element={<AllAirlines />} />
          <Route path="/airlines/:airlineId/details" element={<AirlineDetails />} />
          <Route path="/airlines/:airlineId/delete" element={<AirlineDelete />} />
          <Route path="/airlines/:airlineId/edit" element={<AirlineEdit />} />
          <Route path="/airlines/add" element={<AirlineAdd />} />

          {/* Passenger */}
          <Route path="/passengers" element={<AllPassengers />} />
          <Route path="/passengers/:passengerId/details" element={<PassengerDetails />} />
          <Route path="/passengers/:passengerId/delete" element={<PassengerDelete />} />
          <Route path="/passengers/:passengerId/edit" element={<PassengerEdit />} />
          <Route path="/passengers/add" element={<PassengerAdd   />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App

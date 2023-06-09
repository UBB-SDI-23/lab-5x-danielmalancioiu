import { useState } from 'react'
import './App.css'
import React from 'react'
import { AllBookings } from './components/booking/BookingShowAll'
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom"
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
import SortableTable from './components/booking/BookingAll'
import PassengersTable from './components/passenger/PassengerAll'
import AirlinesTable from './components/airline/AirlineAll'
import FlightsTable from './components/flight/FlightAll'
import { ToastContainer } from 'react-toastify'
import { FlightEdit } from './components/flight/FlightEdit'
import PassengerReport from './components/passenger/PassengerReport'
import AirlineReport from './components/airline/AirlineReport'
import AirlinesFiltered from './components/airline/AirlineFiltered'
import { LoginForm } from './components/user/LoginForm'
import { RegisterForm } from './components/user/RegisterForm'
import { ProfilePage } from './components/user/ProfilePage'
import { AuthProvider } from './services/AuthContext'
import { ProfileEdit } from './components/user/ProfileEdit'
import { AdminBoard } from './components/user/AdminBoard'




function App() {

  return (
  
    <React.Fragment>
      <HashRouter>
      <AuthProvider>
        <AppMenu  />
        <Routes>
          
          {/* Booking */}
          <Route path="/" element={<AppHome />} />
          <Route path="/bookings" element={<SortableTable />} />
          <Route path="/bookings/:bookingId/details" element={<BookingDetails />} />
          <Route path="/bookings/:bookingId/edit" element={<BookingEdit />} />
          <Route path="/bookings/:bookingId/delete" element={<BookingDelete />} />
          <Route path="/bookings/add" element={<BookingAdd />} />

          {/* Flight */}
          <Route path="/flights" element={<FlightsTable />} />
          <Route path="/flights/:flightId/details" element={<FlightDetails />} />
          <Route path="/flights/:flightId/delete" element={<FlightDelete />} />
          <Route path="/flights/add" element={<FlightAdd />} />
          <Route path="/flights/:flightId/edit" element={<FlightEdit />} />

          {/* Ailrine */}
          <Route path="/airlines" element={<AirlinesTable />} />
          <Route path="/airlines/:airlineId/details" element={<AirlineDetails />} />
          <Route path="/airlines/:airlineId/delete" element={<AirlineDelete />} />
          <Route path="/airlines/:airlineId/edit" element={<AirlineEdit />} />
          <Route path="/airlines/add" element={<AirlineAdd />} />
          <Route path="/airlines/statistics" element={<AirlineReport   />} />
          <Route path="/airlines/filter/:fleetSize" element={<AirlinesFiltered   />} />

          {/* Passenger */}
          <Route path="/passengers" element={<PassengersTable />} />
          <Route path="/passengers/:passengerId/details" element={<PassengerDetails />} />
          <Route path="/passengers/:passengerId/delete" element={<PassengerDelete />} />
          <Route path="/passengers/:passengerId/edit" element={<PassengerEdit />} />
          <Route path="/passengers/add" element={<PassengerAdd   />} />
          <Route path="/passengers/statistics" element={<PassengerReport   />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/profile/:username/edit" element={<ProfileEdit />} />
          <Route path="/admin" element={<AdminBoard />} />
        </Routes>
        <ToastContainer />
        </AuthProvider>
      </HashRouter>
      
    </React.Fragment>
    
  
  )
}

export default App

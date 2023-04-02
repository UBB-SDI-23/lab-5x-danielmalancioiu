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


function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <Router>
        <AppMenu />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/bookings/:bookingId/details" element={<BookingDetails />} />
					<Route path="/bookings/:bookingId/edit" element={<BookingEdit />} />
					<Route path="/bookings/:bookingId/delete" element={<BookingDelete />} />
					<Route path="/bookings/add" element={<BookingAdd />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App

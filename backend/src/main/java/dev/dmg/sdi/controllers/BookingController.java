package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.BookingDto;
import dev.dmg.sdi.domain.dto.BookingFlightDto;
import dev.dmg.sdi.domain.dto.BookingPassengerDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	BookingService service;

	@GetMapping("")
	public ResponseEntity<List<Booking>> getAllBookings() {
		List<Booking> bookings = this.service.getAllBookings();
		return ResponseEntity.ok(bookings);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BookingFlightDto> getBookingById(@PathVariable Long id) {
		BookingFlightDto booking = this.service.getByDtoId(id);
		return ResponseEntity.ok(booking);
	}

	@GetMapping("/flight/{flightId}")
	public ResponseEntity<List<BookingDto>> getBookingsByFlightId(@PathVariable Long flightId) {
		List<BookingDto> bookings = service.getBookingByFlightId(flightId);
		if (bookings.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(bookings);
	}

	@GetMapping("/passenger/{passengerId}")
	public ResponseEntity<List<BookingDto>> getBookingsByPassengerId(@PathVariable Long passengerId) {
		List<BookingDto> bookings = service.getBookingByPassengerId(passengerId);
		if (bookings.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(bookings);
	}


	@PostMapping("")
	public ResponseEntity<Booking> addBooking(@RequestBody BookingDto dto) {
		Booking booking = this.service.create(dto);
		return ResponseEntity.ok(booking);
	}

	@PutMapping("{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody BookingDto dto) {
		Booking booking = this.service.update(dto, id);
		return ResponseEntity.ok(booking);
	}

	@DeleteMapping("{id}")
	public void deleteBookingById(@PathVariable Long id) {
		Booking booking = this.service.getById(id);
		this.service.delete(booking);
	}
}

package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.BookingAllDto;
import dev.dmg.sdi.domain.dto.BookingDto;
import dev.dmg.sdi.domain.dto.BookingFlightDto;
import dev.dmg.sdi.domain.dto.BookingPassengerDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.BookingService;
import dev.dmg.sdi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	@Autowired
	UserService userService;

	@Autowired
	JwtUtils jwtUtils;

	@GetMapping("")
	public ResponseEntity<Page<BookingAllDto>> getAllBookings(Pageable pageable) {
		Page<BookingAllDto> bookings = this.service.getAllBookings(pageable);
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
	public Booking addBooking(@RequestBody BookingDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.create(dto, user.getId());

	}

	@PutMapping("{id}")
	public Booking updateBooking(@PathVariable Long id, @RequestBody BookingDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.update(dto, id, user.getId());

	}

	@DeleteMapping("{id}")
	public void deleteBookingById(@PathVariable Long id,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		Booking booking = this.service.getById(id);
		this.service.delete(booking, user.getId());
	}
}

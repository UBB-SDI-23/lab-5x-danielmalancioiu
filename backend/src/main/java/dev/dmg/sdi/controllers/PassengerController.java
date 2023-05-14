package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.PassengerBookingDto;
import dev.dmg.sdi.domain.dto.PassengerDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Passenger;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.repositories.PassengerRepository;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.PassengerService;
import dev.dmg.sdi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/passengers")
public class PassengerController {

	@Autowired
	PassengerService service;

	@Autowired
	PassengerRepository repository;

	@Autowired
	UserService userService;

	@Autowired
	JwtUtils jwtUtils;

	@GetMapping("")
	public ResponseEntity<Page<PassengerDto>> getAllPassengers(Pageable pageable) {

		Page<PassengerDto> passengers = this.service.getAll(pageable);
		return ResponseEntity.ok(passengers);
	}

	@GetMapping("/autocomplete")
	public List<Passenger> autocompletePassenger(@RequestParam String query, @RequestParam int maxResults) {
		return repository.findByFirstNameContainingIgnoreCaseOrderByFirstName(query, PageRequest.of(0, maxResults, Sort.by("firstName")));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Passenger> getPassengerById(@PathVariable Long id) {

		Passenger passenger = this.service.getById(id);
		return ResponseEntity.ok(passenger);
	}

	@GetMapping("/statistics")
	public ResponseEntity<List<PassengerBookingDto>> getAirlinesByAverageCapacity() {
		List<PassengerBookingDto> airlines = service.getAllPassengersOrderedByAverageBookingDate();
		return new ResponseEntity<>(airlines, HttpStatus.OK);
	}

	@GetMapping("/{id}/averagePrice")
	public ResponseEntity<PassengerBookingDto> getAirlineAverageCapacity(@PathVariable Long id) {
		PassengerBookingDto passengerBookingDto = service.getPassengerAveragePrice(id);

		return ResponseEntity.ok(passengerBookingDto);
	}

	@PostMapping("")
	public Passenger addPassenger(@RequestBody PassengerDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.create(dto, user.getId());

	}

	@PutMapping("/{id}")
	public Passenger updatePassenger(@PathVariable Long id, @RequestBody PassengerDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.update(dto, id, user.getId());

	}

	@DeleteMapping("/{id}")
	public void deletePassengerById(@PathVariable Long id,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		Passenger passenger = this.service.getById(id);
		 this.service.delete(passenger, user.getId());
	}


	@GetMapping("/abd")
	public ResponseEntity<Page<PassengerBookingDto>> getAllPassengersOrderedByAverageBookingDate(Pageable pageable)
 {
		Page<PassengerBookingDto> passengersPage = service.getAllPassengersOrderedByAverageBookingDatePaginated(pageable);
		return ResponseEntity.ok(passengersPage);
	}

}

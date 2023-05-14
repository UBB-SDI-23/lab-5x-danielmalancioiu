package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.FlightAllDto;
import dev.dmg.sdi.domain.dto.FlightDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.repositories.FlightRepository;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.FlightService;
import dev.dmg.sdi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/flights")
public class FlightController {

	@Autowired
	FlightService service;

	@Autowired
	FlightRepository repository;

	@Autowired
	UserService userService;

	@Autowired
	JwtUtils jwtUtils;

	//	@GetMapping("")
//	public ResponseEntity<List<FlightDto>> getAllFlights() {
//		List<FlightDto> flights = service.getAll();
//		return ResponseEntity.ok(flights);
//	}
	@GetMapping("")
	public ResponseEntity<Page<FlightAllDto>> getAllFlights(Pageable pageable) {
		Page<FlightAllDto> flights = service.getAllPaged(pageable);
		return ResponseEntity.ok(flights);
	}

	@GetMapping("/autocomplete")
	public List<Flight> autocompleteFlight(@RequestParam String query, @RequestParam int maxResults) {
		return repository.findByCallSignContainingIgnoreCaseOrderByCallSign(query, PageRequest.of(0, maxResults, Sort.by("callSign")));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {

		Flight flight = this.service.getById(id);
		return ResponseEntity.ok(flight);
	}

	@PostMapping("")
	public Flight addFlight(@RequestBody FlightDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.create(dto, user.getId());

	}

	@PutMapping("/{id}")
	public Flight updateFlight(@PathVariable Long id, @RequestBody FlightDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.update(dto, id, user.getId());

	}

	@DeleteMapping("/{id}")
	public void deleteFlightById(@PathVariable Long id,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		Flight flight = this.service.getById(id);
		 this.service.delete(flight, user.getId());

	}
}

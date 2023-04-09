package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.FlightDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.repositories.FlightRepository;
import dev.dmg.sdi.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

	//	@GetMapping("")
//	public ResponseEntity<List<FlightDto>> getAllFlights() {
//		List<FlightDto> flights = service.getAll();
//		return ResponseEntity.ok(flights);
//	}
	@GetMapping("")
	public ResponseEntity<List<Flight>> getAllFlights() {
		List<Flight> flights = service.getFlights();
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
	public ResponseEntity<Flight> addFlight(@RequestBody FlightDto dto) {

		Flight flight = this.service.create(dto);
		return new ResponseEntity<>(flight, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody FlightDto dto) {

		Flight flight = this.service.update(dto, id);
		return ResponseEntity.ok(flight);
	}

	@DeleteMapping("/{id}")
	public void deleteFlightById(@PathVariable Long id) {

		Flight flight = this.service.getById(id);
		this.service.delete(flight);
	}
}

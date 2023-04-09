package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.PassengerBookingDto;
import dev.dmg.sdi.domain.dto.PassengerDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Passenger;
import dev.dmg.sdi.repositories.PassengerRepository;
import dev.dmg.sdi.services.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/passengers")
public class PassengerController {

	@Autowired
	PassengerService service;

	@Autowired
	PassengerRepository repository;

	@GetMapping("")
	public ResponseEntity<List<Passenger>> getAllPassengers() {

		List<Passenger> passengers = this.service.getAll();
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
	public ResponseEntity<Passenger> addPassenger(@RequestBody PassengerDto dto) {

		Passenger passenger = this.service.create(dto);
		return ResponseEntity.ok(passenger);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Passenger> updatePassenger(@PathVariable Long id, @RequestBody PassengerDto dto) {

		Passenger passenger = this.service.update(dto, id);
		return ResponseEntity.ok(passenger);
	}

	@DeleteMapping("/{id}")
	public void deletePassengerById(@PathVariable Long id) {

		Passenger passenger = this.service.getById(id);
		this.service.delete(passenger);
	}
}

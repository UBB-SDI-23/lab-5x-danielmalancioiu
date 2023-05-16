package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.AirlineDto;
import dev.dmg.sdi.domain.dto.AirlineFlightDto;
import dev.dmg.sdi.domain.dto.PassengerBookingDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.repositories.AirlineRepository;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.AirlineService;
import dev.dmg.sdi.services.FlightService;
import dev.dmg.sdi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.FieldError;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/airlines")
@Validated
public class AirlineController {

	@Autowired
	AirlineService service;

	@Autowired
	AirlineRepository repository;

	@Autowired
	private FlightService flightService;

	@Autowired
	UserService userService;

	@Autowired
	JwtUtils jwtUtils;

	@GetMapping("")
	public ResponseEntity<Page<AirlineDto>> getAllAirlines(Pageable pageable) {
		Page<AirlineDto> airlines = service.getAll(pageable);
		return ResponseEntity.ok(airlines);
	}

	@GetMapping("/autocomplete")
	public List<Airline> autocompleteAirline(@RequestParam String query, @RequestParam int maxResults) {
		return repository.findByNameContainingIgnoreCaseOrderByName(query, PageRequest.of(0, maxResults, Sort.by("name")));
	}

	@GetMapping("/{id}")
	public ResponseEntity<AirlineFlightDto> getAirlineById(@PathVariable Long id) {
		AirlineFlightDto airline = service.getByDtoId(id);
		return ResponseEntity.ok(airline);
	}

//	@GetMapping("/statistics")
//	public ResponseEntity<List<AirlineCapacityDto>> getAirlinesByAverageCapacity() {
//		List<AirlineCapacityDto> airlines = service.getAirlinesByAverageCapacity();
//		return new ResponseEntity<>(airlines, HttpStatus.OK);
//	}

	@GetMapping("/{id}/averageCapacity")
	public ResponseEntity<AirlineCapacityDto> getAirlineAverageCapacity(@PathVariable Long id) {
		AirlineCapacityDto airlineCapacityDto = service.getAirlineAverageCapacity(id);

		return ResponseEntity.ok(airlineCapacityDto);
	}

	@PostMapping("")
	public Airline addAirline(@Valid @RequestBody AirlineDto dto,
			@RequestHeader("Authorization") String token)  {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return this.service.create(dto, user.getId());

	}

	@PutMapping("/{id}")
	public Airline updateAirline(@PathVariable Long id, @RequestBody AirlineDto dto,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		 return this.service.update(dto, id, user.getId());

	}

	@DeleteMapping("/{id}")
	public void deleteAirlineById(@PathVariable Long id,
			@RequestHeader("Authorization") String token) {

		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		Airline airline = this.service.getById(id);
		this.service.delete(airline, user.getId());
	}
//
//	@GetMapping("/filter/{fleetSize}")
//	public ResponseEntity<Page<Airline>> filterByFleetSizeGreaterThan(@PathVariable Integer fleetSize, Pageable pageable) {
//		Page<Airline> page = service.filterByFleetSizeGreaterThan(fleetSize, pageable);
//		return ResponseEntity.ok(page);
//	}

	@GetMapping("/filter/{fleetSize}")
	public ResponseEntity<Page<AirlineDto>> filterAirlinesByFleetSizeGreaterThan(
			@PathVariable("fleetSize") int fleetSize,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "id,desc") String[] sort) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(sort[0]).descending());
		Page<AirlineDto> airlines = service.filterByFleetSizeGreaterThan(fleetSize, pageable);

		return ResponseEntity.ok(airlines);
	}

	@PostMapping("/{airlineId}/flights")
	public ResponseEntity<List<Flight>> updateFlightsAirline(@PathVariable Long airlineId, @RequestBody List<Long> flightIds) {
		List<Flight> updatedFlights = flightService.updateBulkAirline(airlineId, flightIds);
		return ResponseEntity.ok().body(updatedFlights);
	}


	@GetMapping("/statistics")
	public ResponseEntity<Page<AirlineCapacityDto>> getAllAirlinesByAverageCapacity(Pageable pageable)
	{
		Page<AirlineCapacityDto> airlinesPage = service.getAirlinesByAverageCapacityPaged(pageable);
		return ResponseEntity.ok(airlinesPage);
	}
}

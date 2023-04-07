package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.AirlineDto;
import dev.dmg.sdi.domain.dto.AirlineFlightDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.services.AirlineService;
import dev.dmg.sdi.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/api/airlines")
public class AirlineController {

	@Autowired
	AirlineService service;

	@Autowired
	private FlightService flightService;

	@GetMapping("")
	public ResponseEntity<List<AirlineDto>> getAllAirlines() {
		List<AirlineDto> airlines = service.getAll();
		return ResponseEntity.ok(airlines);
	}

	@GetMapping("/{id}")
	public ResponseEntity<AirlineFlightDto> getAirlineById(@PathVariable Long id) {
		AirlineFlightDto airline = service.getByDtoId(id);
		return ResponseEntity.ok(airline);
	}

	@GetMapping("/statistics")
	public ResponseEntity<List<AirlineCapacityDto>> getAirlinesByAverageCapacity() {
		List<AirlineCapacityDto> airlines = service.getAirlinesByAverageCapacity();
		return new ResponseEntity<>(airlines, HttpStatus.OK);
	}

	@GetMapping("/{id}/averageCapacity")
	public ResponseEntity<AirlineCapacityDto> getAirlineAverageCapacity(@PathVariable Long id) {
		AirlineCapacityDto airlineCapacityDto = service.getAirlineAverageCapacity(id);

		return ResponseEntity.ok(airlineCapacityDto);
	}

	@PostMapping("")
	public ResponseEntity<Airline> addAirline(@Valid @RequestBody AirlineDto dto)  {

		Airline airline = this.service.create(dto);
		//return new ResponseEntity<>(airline, HttpStatus.CREATED);
		return ResponseEntity.ok(airline);
	}

	@PostMapping("/post")
	public ResponseEntity<?> addAirline(@Valid @RequestBody AirlineDto dto, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().body(result.getAllErrors());
		}

		Airline airline = service.create(dto);
		return ResponseEntity.ok(airline);
	}



	@PutMapping("/{id}")
	public ResponseEntity<Airline> updateAirline(@PathVariable Long id, @RequestBody AirlineDto dto) {

		Airline airline = this.service.update(dto, id);
		return ResponseEntity.ok(airline);
	}

	@DeleteMapping("/{id}")
	public void deleteAirlineById(@PathVariable Long id) {

		Airline airline = this.service.getById(id);
		this.service.delete(airline);
	}

	@GetMapping("/filter/{fleetSize}")
	public ResponseEntity<List<Airline>> filterByFleetSizeGreaterThan(@PathVariable Integer fleetSize) {
		ResponseEntity<List<Airline>> response = service.filterByFleetSizeGreaterThan(fleetSize);
		if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
			return ResponseEntity.notFound().build();
		}
		else {
			return response;
		}
	}

	@PostMapping("/{airlineId}/flights")
	public ResponseEntity<List<Flight>> updateFlightsAirline(@PathVariable Long airlineId, @RequestBody List<Long> flightIds) {
		List<Flight> updatedFlights = flightService.updateBulkAirline(airlineId, flightIds);
		return ResponseEntity.ok().body(updatedFlights);
	}
}

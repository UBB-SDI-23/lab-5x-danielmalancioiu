package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.FlightDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.repositories.AirlineRepository;
import dev.dmg.sdi.repositories.FlightRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

	@Autowired
	private FlightRepository repository;

	@Autowired
	private AirlineService airlineService;

	@Autowired
	private AirlineRepository airlineRepository;


	public Flight create(FlightDto dto) {
		Flight flight = new Flight();
		BeanUtils.copyProperties(dto, flight, "id");


		Airline airline = this.airlineService.getById(dto.getAirlineId());
		flight.setAirline(airline);
		return this.save(flight);
	}

	public Flight update(FlightDto dto, Long id) {
		Flight flight = this.getById(id);
		BeanUtils.copyProperties(dto, flight, "id");

		Airline airline = this.airlineService.getById(dto.getAirlineId());
		flight.setAirline(airline);

		return this.save(flight);
	}

	public List<FlightDto> getAll() {
		List<Flight> flights = repository.findAll();
		List<FlightDto> flightDtos = new ArrayList<>();
		if (flights.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No flights found.");
		} else {

			for (Flight flight : flights) {
				FlightDto flightDto = new FlightDto(flight.getId(),flight.getCallSign(), flight.getCapacity(), flight.getDepartureAirport(), flight.getArrivalAirport(),
						flight.getAirline().getId());

				flightDtos.add(flightDto);
			}
		}
		return flightDtos;
	}

	public List<Flight> getFlights() {
		List<Flight> flights = repository.findAll();
		if (flights.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No flights found.");
		} else {
			return flights;
		}
	}


	public Flight getById(Long id) {
		Optional<Flight> flightOptional = repository.findById(id);
		if (flightOptional.isPresent()) {
			return flightOptional.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found with ID " + id);
		}
	}

	public Flight save(Flight flight) {return this.repository.save(flight);}

	public void delete(Flight flight) {this.repository.delete(flight);}

	public List<Flight> updateBulkAirline(Long airlineId, List<Long> flightIds) {
		Optional<Airline> airlineOptional = airlineRepository.findById(airlineId);
		if (airlineOptional.isPresent()) {
			Airline airline = airlineOptional.get();
			List<Flight> updatedFlights = new ArrayList<>();
			for (Long flightId : flightIds) {
				Optional<Flight> flightOptional = repository.findById(flightId);
				if (flightOptional.isPresent()) {
					Flight flight = flightOptional.get();
					flight.setAirline(airline);
					updatedFlights.add(repository.save(flight));
				}
			}
			return updatedFlights;
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Airline not found with ID " + airlineId);
		}
	}
}

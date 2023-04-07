package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.AirlineDto;
import dev.dmg.sdi.domain.dto.AirlineFlightDto;
import dev.dmg.sdi.domain.dto.FlightDto;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.repositories.AirlineRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

	@Autowired
	private AirlineRepository repository;

	private EntityManagerFactory entityManagerFactory;

	public AirlineService(EntityManagerFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}

	public Airline create(AirlineDto dto)  {
		Airline airline = new Airline();
		BeanUtils.copyProperties(dto, airline, "id");

		return this.save(airline);
	}

	public Airline update(AirlineDto dto, Long id) {
		Airline airline = this.getById(id);
		BeanUtils.copyProperties(dto, airline, "id");

		return this.save(airline);
	}

	public List<AirlineDto> getAll() {
		List<Airline> airlines = repository.findAll();
		List<AirlineDto> airlineDtos = new ArrayList<>();
		if (airlines.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No airlines found.");
		} else {

			for (Airline airline : airlines) {
				AirlineDto airlineDto = new AirlineDto(airline.getId(), airline.getName(), airline.getIataCode(), airline.getFleetSize(), airline.getWebsite(), airline.getCountry());

				airlineDtos.add(airlineDto);
			}
		}
		return airlineDtos;
	}


	public ResponseEntity<List<Airline>> filterByFleetSizeGreaterThan(Integer fleetSize) {
		List<Airline> airlines = repository.findByFleetSizeGreaterThan(fleetSize);
		if (airlines.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(airlines);
		}
	}

	public Airline getById(Long id) {
		Optional<Airline> airlineOptional = repository.findById(id);
		if (airlineOptional.isPresent()) {

			return airlineOptional.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Airline not found with ID " + id);
		}
	}

	public AirlineFlightDto getByDtoId(Long id) {
		Optional<Airline> airlineOptional = repository.findById(id);
		if(airlineOptional.isPresent()) {
			List<Flight> flights = airlineOptional.get().getFlights();
			List<FlightDto> flightDtos = new ArrayList<>();

			for ( Flight flight : flights) {
				FlightDto flightDto = new FlightDto(flight.getId(), flight.getCallSign(), flight.getCapacity(), flight.getDepartureAirport(), flight.getArrivalAirport(), flight.getAirline().getId());
				flightDtos.add(flightDto);
			}
			AirlineFlightDto airlineFlightDto = new AirlineFlightDto(airlineOptional.get().getId(), airlineOptional.get().getName(), airlineOptional.get().getIataCode(),airlineOptional.get().getFleetSize(),airlineOptional.get().getWebsite(),airlineOptional.get().getCountry(), flightDtos);
			return airlineFlightDto;
		}
		else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Airline not found with ID " + id);
		}
	}

	public List<AirlineCapacityDto> getAirlinesByAverageCapacity() {
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		try {
			CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<AirlineCapacityDto> criteriaQuery = criteriaBuilder.createQuery(AirlineCapacityDto.class);
			Root<Airline> airlineRoot = criteriaQuery.from(Airline.class);
			Join<Airline, Flight> flightJoin = airlineRoot.join("flights");
			criteriaQuery.select(criteriaBuilder.construct(AirlineCapacityDto.class, airlineRoot.get("id"), airlineRoot.get("name"), criteriaBuilder.avg(flightJoin.get("capacity"))))
					.groupBy(airlineRoot.get("id"))
					.orderBy(criteriaBuilder.asc(criteriaBuilder.avg(flightJoin.get("capacity"))));
			TypedQuery<AirlineCapacityDto> query = entityManager.createQuery(criteriaQuery);
			return query.getResultList();
		} finally {
			entityManager.close();
		}
	}

	public AirlineCapacityDto getAirlineAverageCapacity(Long id) {
		List<AirlineCapacityDto> airlineCapacityDtos = this.getAirlinesByAverageCapacity();
		for (AirlineCapacityDto airlineCapacityDto : airlineCapacityDtos) {
			if (airlineCapacityDto.getId().equals(id)) {
				return airlineCapacityDto;
			}
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Airline not found with ID " + id);
	}






	public Airline save(Airline airline) {return this.repository.save(airline); }

	public void delete(Airline airline) { this.repository.delete(airline); }
}

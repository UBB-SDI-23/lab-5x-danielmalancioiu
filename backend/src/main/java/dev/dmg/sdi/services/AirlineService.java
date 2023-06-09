package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.*;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.domain.entities.User.ERole;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.exceptions.AirlineNotFoundException;
import dev.dmg.sdi.exceptions.UserNotAuthorizedException;
import dev.dmg.sdi.exceptions.UserNotFoundException;
import dev.dmg.sdi.repositories.AirlineRepository;
import dev.dmg.sdi.repositories.BookingRepository;
import dev.dmg.sdi.repositories.FlightRepository;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import dev.dmg.sdi.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AirlineService {

	@Autowired
	private AirlineRepository repository;

	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	private EntityManagerFactory entityManagerFactory;

	public AirlineService(EntityManagerFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}

	public Airline create(AirlineDto dto, Long userID) {
		Airline airline = new Airline();
		BeanUtils.copyProperties(dto, airline, "id");

//		User user = this.userService.getUserByUsername(dto.getUsername());
		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		airline.setUser(user);

		boolean userOrModOrAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
						|| role.getName() == ERole.ROLE_MODERATOR
						|| role.getName() == ERole.ROLE_USER
		);

		if (!userOrModOrAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		return this.save(airline);
	}

	public Airline update(AirlineDto dto, Long id, Long userID) {
		Airline airline = this.getById(id);
		BeanUtils.copyProperties(dto, airline, "id");

		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		//airline.setUser(user);

		boolean isUser = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_USER
		);
		if (!isUser) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		if (!Objects.equals(user.getId(), airline.getUser().getId())) {
			boolean modOrAdmin = user.getRoles().stream().anyMatch((role) ->
					role.getName() == ERole.ROLE_ADMIN || role.getName() == ERole.ROLE_MODERATOR
			);

			if (!modOrAdmin) {
				throw new UserNotAuthorizedException(String.format(user.getUsername()));
			}
		}

		return this.save(airline);
	}

	//	public List<AirlineDto> getAll() {
//		List<Airline> airlines = repository.findAll();
//		List<AirlineDto> airlineDtos = new ArrayList<>();
//		if (airlines.isEmpty()) {
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No airlines found.");
//		} else {
//
//			for (Airline airline : airlines) {
//				AirlineDto airlineDto = new AirlineDto(airline.getId(), airline.getName(), airline.getIataCode(), airline.getFleetSize(), airline.getWebsite(), airline.getCountry());
//
//				airlineDtos.add(airlineDto);
//			}
//		}
//		return airlineDtos;
//	}
	public Page<AirlineDto> getAll(Pageable pageable) {
		Page<Airline> airlines = repository.findAll(pageable);
		if (airlines.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No airlines found.");
		}

		return airlines.map(airline -> new AirlineDto(airline.getId(), airline.getName(), airline.getIataCode(), airline.getFleetSize(), airline.getWebsite(),
				airline.getCountry(), this.flightRepository.countByAirline_Id(airline.getId()), airline.getUser().getUsername()));
	}

//	public ResponseEntity<List<Airline>> filterByFleetSizeGreaterThan(Integer fleetSize) {
//		List<Airline> airlines = repository.findByFleetSizeGreaterThan(fleetSize);
//		if (airlines.isEmpty()) {
//			return ResponseEntity.notFound().build();
//		}
//		else {
//			return ResponseEntity.ok(airlines);
//		}
//	}

	public Page<AirlineDto> filterByFleetSizeGreaterThan(Integer fleetSize, Pageable pageable) {
		Page<Airline> airlines = repository.findByFleetSizeGreaterThan(fleetSize,pageable);
		if (airlines.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No airlines found.");
		}
		return airlines.map(airline -> new AirlineDto(airline.getId(), airline.getName(), airline.getIataCode(), airline.getFleetSize(), airline.getWebsite(),
				airline.getCountry(), this.flightRepository.countByAirline_Id(airline.getId()), airline.getUser().getUsername()));
	}


//	public Airline getById(Long id) {
//		Optional<Airline> airlineOptional = repository.findById(id);
//		if (airlineOptional.isPresent()) {
//
//			return airlineOptional.get();
//		}
//		else {
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Airline not found with ID " + id);
//		}
//	}

	public Airline getById(Long id) {
		return this.repository.findById(id).orElseThrow(() -> new AirlineNotFoundException(id));
	}

	public AirlineFlightDto getByDtoId(Long id) {
		Optional<Airline> airlineOptional = repository.findById(id);
		if (airlineOptional.isPresent()) {
			List<Flight> flights = airlineOptional.get().getFlights();
			List<FlightAllDto> flightDtos = new ArrayList<>();

			for (Flight flight : flights) {
				FlightAllDto flightDto = new FlightAllDto(flight.getId(), flight.getCallSign(), flight.getCapacity(), flight.getDepartureAirport(),
						flight.getArrivalAirport(), flight.getAirline(), this.bookingRepository.countByFlight_Id(flight.getId()), flight.getUser().getUsername());
				flightDtos.add(flightDto);
			}
			AirlineFlightDto airlineFlightDto = new AirlineFlightDto(airlineOptional.get().getId(), airlineOptional.get().getName(),
					airlineOptional.get().getIataCode(), airlineOptional.get().getFleetSize(), airlineOptional.get().getWebsite(),
					airlineOptional.get().getCountry(), flightDtos);
			return airlineFlightDto;
		}
		else {
			throw new AirlineNotFoundException(id);
		}
	}

	public List<AirlineCapacityDto> getAirlinesByAverageCapacity() {
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		try {
			CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<AirlineCapacityDto> criteriaQuery = criteriaBuilder.createQuery(AirlineCapacityDto.class);
			Root<Airline> airlineRoot = criteriaQuery.from(Airline.class);
			Join<Airline, Flight> flightJoin = airlineRoot.join("flights");
			criteriaQuery.select(criteriaBuilder.construct(AirlineCapacityDto.class, airlineRoot.get("id"), airlineRoot.get("name"),
							airlineRoot.get("iataCode"), airlineRoot.get("fleetSize"), airlineRoot.get("website"), airlineRoot.get("country"),
							criteriaBuilder.avg(flightJoin.get("capacity"))))
					.groupBy(airlineRoot.get("id"))
					.orderBy(criteriaBuilder.asc(criteriaBuilder.avg(flightJoin.get("capacity"))));
			TypedQuery<AirlineCapacityDto> query = entityManager.createQuery(criteriaQuery);
			return query.getResultList();
		}
		finally {
			entityManager.close();
		}
	}

	public Page<AirlineCapacityDto> getAirlinesByAverageCapacityPaged(Pageable pageable) {
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		try {
			CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<AirlineCapacityDto> criteriaQuery = criteriaBuilder.createQuery(AirlineCapacityDto.class);
			Root<Airline> airlineRoot = criteriaQuery.from(Airline.class);
			Join<Airline, Flight> flightJoin = airlineRoot.join("flights");
			criteriaQuery.select(criteriaBuilder.construct(AirlineCapacityDto.class, airlineRoot.get("id"), airlineRoot.get("name"),
							airlineRoot.get("iataCode"), airlineRoot.get("fleetSize"), airlineRoot.get("website"), airlineRoot.get("country"),
							criteriaBuilder.avg(flightJoin.get("capacity"))))
					.groupBy(airlineRoot.get("id"))
					.orderBy(criteriaBuilder.asc(criteriaBuilder.avg(flightJoin.get("capacity"))));
			TypedQuery<AirlineCapacityDto> query = entityManager.createQuery(criteriaQuery);
			int totalElements = query.getResultList().size();
			query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
			query.setMaxResults(pageable.getPageSize());
			List<AirlineCapacityDto> content = query.getResultList();
			return new PageImpl<>(content, pageable, totalElements);
		}
		finally {
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

		throw new AirlineNotFoundException(id);
	}

	public Airline save(Airline airline) {
		return this.repository.save(airline);
	}

	public void delete(Airline airline, Long userID) {
		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);
		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		if(!repository.existsById(airline.getId()))
			throw new AirlineNotFoundException((airline.getId()));
		repository.deleteById(airline.getId());
	}
}

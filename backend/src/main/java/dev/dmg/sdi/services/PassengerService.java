package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.PassengerBookingDto;
import dev.dmg.sdi.domain.dto.PassengerDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.Passenger;
import dev.dmg.sdi.domain.entities.User.ERole;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.exceptions.AirlineNotFoundException;
import dev.dmg.sdi.exceptions.PassengerNotFoundException;
import dev.dmg.sdi.exceptions.UserNotAuthorizedException;
import dev.dmg.sdi.exceptions.UserNotFoundException;
import dev.dmg.sdi.repositories.BookingRepository;
import dev.dmg.sdi.repositories.PassengerRepository;
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
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
//5960
@Service
public class PassengerService {

	@Autowired
	PassengerRepository repository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	UserService userService;

	private EntityManagerFactory entityManagerFactory;

	@Autowired
	UserRepository userRepository;

	public PassengerService(EntityManagerFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}


	public Passenger create(PassengerDto dto, Long userID) {
		Passenger passenger = new Passenger();
		BeanUtils.copyProperties(dto, passenger);

		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		passenger.setUser(user);

		boolean userOrModOrAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
						|| role.getName() == ERole.ROLE_MODERATOR
						|| role.getName() == ERole.ROLE_USER
		);

		if (!userOrModOrAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		return this.save(passenger);
	}

	public Passenger update(PassengerDto dto, Long id, Long userID) {
		Passenger passenger = this.getById(id);
		BeanUtils.copyProperties(dto, passenger);

		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		//airline.setUser(user);

		boolean isUser = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_USER
		);
		if (!isUser) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		if (!Objects.equals(user.getId(), passenger.getUser().getId())) {
			boolean modOrAdmin = user.getRoles().stream().anyMatch((role) ->
					role.getName() == ERole.ROLE_ADMIN || role.getName() == ERole.ROLE_MODERATOR
			);

			if (!modOrAdmin) {
				throw new UserNotAuthorizedException(String.format(user.getUsername()));
			}
		}
		return this.save(passenger);
	}

	public Page<PassengerDto> getAll(Pageable pageable) {
		Page<Passenger> passengers = repository.findAll(pageable);

		if (passengers.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No passengers found.");
		}
		return passengers.map(passenger -> new PassengerDto(passenger.getId(), passenger.getFirstName(), passenger.getLastName(), passenger.getDateOfBirth(), passenger.getNationality(), passenger.getPassportNumber(), this.bookingRepository.countByPassenger_Id(
				passenger.getId()), passenger.getUser().getUsername()));
	}

//	public Passenger getById(Long id) {
//		Optional<Passenger> passengerOptional = repository.findById(id);
//		if (passengerOptional.isPresent()) {
//			return passengerOptional.get();
//		} else {
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found with ID " + id);
//		}
//	}

	public Passenger getById(Long id) {
		return this.repository.findById(id).orElseThrow(() -> new PassengerNotFoundException(id));
	}

		public List<PassengerBookingDto> getAllPassengersOrderedByAverageBookingDate() {
			EntityManager entityManager = entityManagerFactory.createEntityManager();
			try {
				CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
				CriteriaQuery<PassengerBookingDto> criteriaQuery = criteriaBuilder.createQuery(PassengerBookingDto.class);
				Root<Passenger> passengerRoot = criteriaQuery.from(Passenger.class);
				Join<Passenger, Booking> bookingJoin = passengerRoot.join("bookings");
				criteriaQuery.select(criteriaBuilder.construct(PassengerBookingDto.class,
								passengerRoot.get("id"),
								passengerRoot.get("firstName"),
								passengerRoot.get("lastName"),
								passengerRoot.get("dateOfBirth"),
								passengerRoot.get("nationality"),
								passengerRoot.get("passportNumber"),
								criteriaBuilder.avg(bookingJoin.get("price")).as(Double.class)))
						.groupBy(passengerRoot.get("id"))
						.orderBy(criteriaBuilder.asc(criteriaBuilder.avg(bookingJoin.get("price"))));
				TypedQuery<PassengerBookingDto> query = entityManager.createQuery(criteriaQuery);
				return query.getResultList();
			} finally {
				entityManager.close();
			}
		}



	public PassengerBookingDto getPassengerAveragePrice(Long id) {
		List<PassengerBookingDto> passengerBookingDtos = this.getAllPassengersOrderedByAverageBookingDate();
		for (PassengerBookingDto passengerBookingDto : passengerBookingDtos) {
			if (passengerBookingDto.getId().equals(id)) {
				return passengerBookingDto;
			}
		}

		throw new PassengerNotFoundException(id);
	}


	public Passenger save(Passenger passenger) {return this.repository.save(passenger); }

	public void delete(Passenger passenger, Long userID) {
		User user = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);
		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		if(!repository.existsById(passenger.getId()))
			throw new AirlineNotFoundException((passenger.getId()));
		repository.deleteById(passenger.getId());
	}



	public Page<PassengerBookingDto> getAllPassengersOrderedByAverageBookingDatePaginated(Pageable pageable) {
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		try {
			CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<PassengerBookingDto> criteriaQuery = criteriaBuilder.createQuery(PassengerBookingDto.class);
			Root<Passenger> passengerRoot = criteriaQuery.from(Passenger.class);
			Join<Passenger, Booking> bookingJoin = passengerRoot.join("bookings");
			criteriaQuery.select(criteriaBuilder.construct(PassengerBookingDto.class,
							passengerRoot.get("id"),
							passengerRoot.get("firstName"),
							passengerRoot.get("lastName"),
							passengerRoot.get("dateOfBirth"),
							passengerRoot.get("nationality"),
							passengerRoot.get("passportNumber"),
							criteriaBuilder.avg(bookingJoin.get("price")).as(Double.class)))
					.groupBy(passengerRoot.get("id"))
					.orderBy(criteriaBuilder.asc(criteriaBuilder.avg(bookingJoin.get("price"))));
			TypedQuery<PassengerBookingDto> query = entityManager.createQuery(criteriaQuery);
			int totalElements = query.getResultList().size();
			query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
			query.setMaxResults(pageable.getPageSize());
			List<PassengerBookingDto> content = query.getResultList();
			return new PageImpl<>(content, pageable, totalElements);
		} finally {
			entityManager.close();
		}
	}


}




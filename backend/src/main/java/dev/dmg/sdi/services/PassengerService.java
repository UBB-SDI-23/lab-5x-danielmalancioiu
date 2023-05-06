package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.AirlineCapacityDto;
import dev.dmg.sdi.domain.dto.PassengerBookingDto;
import dev.dmg.sdi.domain.dto.PassengerDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.Passenger;
import dev.dmg.sdi.repositories.BookingRepository;
import dev.dmg.sdi.repositories.PassengerRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
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
import java.util.Optional;
//5960
@Service
public class PassengerService {

	@Autowired
	PassengerRepository repository;

	@Autowired
	private BookingRepository bookingRepository;

	private EntityManagerFactory entityManagerFactory;

	public PassengerService(EntityManagerFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}


	public Passenger create(PassengerDto dto) {
		Passenger passenger = new Passenger();
		BeanUtils.copyProperties(dto, passenger);

		return this.save(passenger);
	}

	public Passenger update(PassengerDto dto, Long id) {
		Passenger passenger = this.getById(id);
		BeanUtils.copyProperties(dto, passenger);

		return this.save(passenger);
	}

	public Page<PassengerDto> getAll(Pageable pageable) {
		Page<Passenger> passengers = repository.findAll(pageable);

		if (passengers.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No passengers found.");
		}
		return passengers.map(passenger -> new PassengerDto(passenger.getId(), passenger.getFirstName(), passenger.getLastName(), passenger.getDateOfBirth(), passenger.getNationality(), passenger.getPassportNumber(), this.bookingRepository.countByPassenger_Id(
				passenger.getId())));
	}

	public Passenger getById(Long id) {
		Optional<Passenger> passengerOptional = repository.findById(id);
		if (passengerOptional.isPresent()) {
			return passengerOptional.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found with ID " + id);
		}
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

		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found with ID " + id);
	}


	public Passenger save(Passenger passenger) {return this.repository.save(passenger); }

	public void delete(Passenger passenger) { this.repository.delete(passenger); }



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




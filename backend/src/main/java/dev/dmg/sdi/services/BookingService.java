package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.dto.BookingAllDto;
import dev.dmg.sdi.domain.dto.BookingDto;
import dev.dmg.sdi.domain.dto.BookingFlightDto;
import dev.dmg.sdi.domain.dto.FlightDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.domain.entities.Passenger;
import dev.dmg.sdi.repositories.BookingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

	@Autowired
	private BookingRepository repository;

	@Autowired
	private FlightService flightService;

	@Autowired
	private PassengerService passengerService;

	public Booking create(BookingDto dto) {
		Booking booking = new Booking();
		BeanUtils.copyProperties(dto, booking );

		Flight flight = this.flightService.getById(dto.getFlightId());
		booking.setFlight(flight);

		Passenger passenger = this.passengerService.getById(dto.getPassengerId());
		booking.setPassenger(passenger);

		return this.save(booking);
	}

	public Booking update(BookingDto dto, Long id) {
		Booking booking = this.getById(id);
		BeanUtils.copyProperties(dto, booking);

		Flight flight = this.flightService.getById(dto.getFlightId());
		booking.setFlight(flight);

		Passenger passenger = this.passengerService.getById(dto.getPassengerId());
		booking.setPassenger(passenger);

		return this.save(booking);
	}

	public List<BookingDto> getAll() {
		List<Booking> bookings = repository.findAll();
		List<BookingDto> bookingDtos = new ArrayList<>();
		if(bookings.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No bookings found.");
		}
		else {

			for (Booking booking : bookings) {
				BookingDto bookingDto = new BookingDto( booking.getFlight().getId(), booking.getPassenger().getId(), booking.getSeatNumber(), booking.getDate(), booking.getPrice(), booking.getUser().getUsername());

				bookingDtos.add(bookingDto);
			}
		}
		return bookingDtos;
	}

	public Page<BookingAllDto> getAllBookings(Pageable pageable) {
		Page<Booking> bookings = repository.findAll(pageable);
		if(bookings.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No bookings found.");
		}
		return bookings.map(booking -> new BookingAllDto( booking.getFlight(), booking.getPassenger(), booking.getSeatNumber(), booking.getDate(), booking.getPrice(), booking.getUser().getUsername()));

	}

	public Booking getById(Long id) {
		Optional<Booking> bookingOptional = repository.findById(id);
		if(bookingOptional.isPresent()) {
			return bookingOptional.get();
		}
		else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID " + id);
		}
	}

	public BookingFlightDto getByDtoId(Long id) {
		Optional<Booking> bookingOptional = repository.findById(id);
		if(bookingOptional.isPresent()) {
			List<FlightDto> flightDtos = this.flightService.getAll();
			FlightDto flightDto = flightDtos.stream()
								  .filter(element -> element.getId().equals(bookingOptional.get().getFlight().getId()))
								  .findFirst()
								  .orElse(null);
			BookingFlightDto bookingFlightDto = new BookingFlightDto(bookingOptional.get().getId(), flightDto, bookingOptional.get().getPassenger(), bookingOptional.get().getSeatNumber(), bookingOptional.get().getDate());
			return bookingFlightDto;

		}
		else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID " + id);
		}
	}

	public List<BookingDto> getBookingByFlightId (Long id) {
		List<BookingDto> bookingDtos = new ArrayList<>();
		List<Booking> bookings = this.repository.findAllByFlightId(id);
		for( Booking booking : bookings) {
			BookingDto dto = new BookingDto( booking.getFlight().getId(), booking.getPassenger().getId(), booking.getSeatNumber(), booking.getDate(), booking.getPrice(), booking.getUser().getUsername());
			bookingDtos.add(dto);
		}
		return bookingDtos;
	}

	public List<BookingDto> getBookingByPassengerId (Long id) {
		List<BookingDto> bookingDtos = new ArrayList<>();
		List<Booking> bookings = this.repository.findAllByPassengerId(id);
		for( Booking booking : bookings) {
			BookingDto dto = new BookingDto( booking.getFlight().getId(), booking.getPassenger().getId(), booking.getSeatNumber(), booking.getDate(), booking.getPrice(),booking.getUser().getUsername());
			bookingDtos.add(dto);
		}
		return bookingDtos;
	}


	public Booking save(Booking booking) { return this.repository.save(booking);}

	public void delete(Booking booking) { this.repository.delete(booking); }
}

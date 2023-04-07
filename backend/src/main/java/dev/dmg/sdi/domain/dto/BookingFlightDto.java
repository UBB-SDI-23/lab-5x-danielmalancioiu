package dev.dmg.sdi.domain.dto;

import dev.dmg.sdi.domain.entities.Passenger;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingFlightDto {

	private Long id;

	private FlightDto flight;

	private Passenger passenger;

	private String seatNumber;

	private LocalDate date;


	public BookingFlightDto() {
	}

	public BookingFlightDto(Long id, FlightDto flight, Passenger passenger, String seatNumber, LocalDate date) {
		this.id = id;
		this.flight = flight;
		this.passenger = passenger;
		this.seatNumber = seatNumber;
		this.date = date;
	}
}

package dev.dmg.sdi.domain.dto;

import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.Flight;
import dev.dmg.sdi.domain.entities.Passenger;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingAllDto {

	private Long id;

	private Flight flight;

	private Passenger passenger;

	private String seatNumber;

	private LocalDate date;

	private Integer price;

	private String username;

	public BookingAllDto(Long id,Flight flight, Passenger passenger, String seatNumber, LocalDate date, Integer price, String username) {
		this.id = id;
		this.flight = flight;
		this.passenger = passenger;
		this.seatNumber = seatNumber;
		this.date = date;
		this.price = price;
		this.username = username;
	}
}

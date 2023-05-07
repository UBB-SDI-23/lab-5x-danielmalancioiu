package dev.dmg.sdi.domain.dto;

import dev.dmg.sdi.domain.entities.Booking;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDto {

	private Long flightId;

	private Long passengerId;

	private String seatNumber;

	private LocalDate date;

	private Integer price;

	private String username;

	public BookingDto(Long flightId, Long passengerId, String seatNumber, LocalDate date, Integer price, String username) {
		this.flightId = flightId;
		this.passengerId = passengerId;
		this.seatNumber = seatNumber;
		this.date = date;
		this.price = price;
		this.username = username;
	}
}

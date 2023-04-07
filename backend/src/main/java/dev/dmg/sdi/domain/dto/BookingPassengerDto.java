package dev.dmg.sdi.domain.dto;

import dev.dmg.sdi.domain.entities.Booking;
import lombok.Data;

@Data
public class BookingPassengerDto {

	private Long id;
	private Long flight;
	private Long passenger;
	private Long passengerBookingCount;

	public BookingPassengerDto(Booking booking, Long passengerBookingCount) {
		this.id = booking.getId();
		this.flight = booking.getFlight().getId();
		this.passenger = booking.getPassenger().getId();
		this.passengerBookingCount = passengerBookingCount;
	}



}


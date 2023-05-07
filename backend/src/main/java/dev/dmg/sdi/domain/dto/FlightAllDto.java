package dev.dmg.sdi.domain.dto;

import dev.dmg.sdi.domain.entities.Airline;
import lombok.Data;

@Data
public class FlightAllDto {


	private Long id;

	private String callSign;

	private Integer capacity;

	private String departureAirport;

	private String arrivalAirport;

	private Airline airline;

	private Long numberOfBookings;

	private String username;

	public FlightAllDto(Long id, String callSign, Integer capacity, String departureAirport, String arrivalAirport, Airline airline, Long numberOfBookings,
			String username) {
		this.id = id;
		this.callSign = callSign;
		this.capacity = capacity;
		this.departureAirport = departureAirport;
		this.arrivalAirport = arrivalAirport;
		this.airline = airline;
		this.numberOfBookings = numberOfBookings;
		this.username = username;
	}
}

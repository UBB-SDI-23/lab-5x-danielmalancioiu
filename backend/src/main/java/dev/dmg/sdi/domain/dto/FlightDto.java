package dev.dmg.sdi.domain.dto;

import lombok.Data;

@Data
public class FlightDto {


	private Long id;

	private String callSign;

	private Integer capacity;

	private String departureAirport;

	private String arrivalAirport;

	private Long airlineId;

	private String username;


	public FlightDto(Long id, String callSign, Integer capacity, String departureAirport, String arrivalAirport, Long airlineId) {
		this.id = id;
		this.callSign = callSign;
		this.capacity = capacity;
		this.departureAirport = departureAirport;
		this.arrivalAirport = arrivalAirport;
		this.airlineId = airlineId;

	}

}

package dev.dmg.sdi.domain.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Data
public class AirlineFlightDto {

	private Long id;

	@NotBlank(message = "Name is required")
	private String name;

	@NotBlank(message = "Iata code is required")
	private String iataCode;

	@PositiveOrZero(message = "Fleet size cannot be negative")
	private Integer fleetSize;

	private String website;

	private String country;

	private List<FlightDto> flights;

	public AirlineFlightDto(Long id, String name, String iataCode, Integer fleetSize, String website, String country, List<FlightDto> flights) {
		this.id = id;
		this.name = name;
		this.iataCode = iataCode;
		this.fleetSize = fleetSize;
		this.website = website;
		this.country = country;
		this.flights = flights;
	}

	public AirlineFlightDto() {
	}
}

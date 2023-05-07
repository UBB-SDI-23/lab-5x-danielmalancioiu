package dev.dmg.sdi.domain.dto;

import javax.persistence.Entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import lombok.Data;



@Data
public class AirlineDto {

	private Long id;

	@NotBlank(message = "Name is required")
	private String name;

	@NotBlank(message = "Iata code is required")
	private String iataCode;

	@PositiveOrZero(message = "Fleet size cannot be negative")
	private Integer fleetSize;

	private String website;

	private String country;

	private Long numberOfFlights;

	private String username;

	public AirlineDto(Long id, String name, String iataCode, Integer fleetSize, String website, String country, Long numberOfFlights, String username) {
		this.id = id;
		this.name = name;
		this.iataCode = iataCode;
		this.fleetSize = fleetSize;
		this.website = website;
		this.country = country;
		this.numberOfFlights = numberOfFlights;
		this.username = username;
	}

	public AirlineDto() {
	}
}

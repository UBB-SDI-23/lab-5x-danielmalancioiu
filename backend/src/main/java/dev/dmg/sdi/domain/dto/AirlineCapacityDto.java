package dev.dmg.sdi.domain.dto;

import lombok.Data;

@Data
public class AirlineCapacityDto {

	private Long id;

	private String name;

	private String iataCode;

	private Integer fleetSize;

	private String website;

	private String country;

	private Double averageFlightCapacity;

	public AirlineCapacityDto(Long id, String name, String iataCode, Integer fleetSize, String website, String country, Double averageFlightCapacity) {
		this.id = id;
		this.name = name;
		this.iataCode = iataCode;
		this.fleetSize = fleetSize;
		this.website = website;
		this.country = country;
		this.averageFlightCapacity = averageFlightCapacity;
	}
}

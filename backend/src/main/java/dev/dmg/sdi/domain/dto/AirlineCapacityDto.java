package dev.dmg.sdi.domain.dto;

import lombok.Data;

@Data
public class AirlineCapacityDto {

	private Long id;

	private String name;

	private Double averageFlightCapacity;

	public AirlineCapacityDto(Long id, String name, Double averageFlightCapacity) {
		this.id = id;
		this.name = name;
		this.averageFlightCapacity = averageFlightCapacity;
	}
}

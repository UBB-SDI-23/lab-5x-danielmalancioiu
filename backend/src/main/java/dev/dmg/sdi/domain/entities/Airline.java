package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Data
@Entity
@Table(name = "airline")
@JsonIgnoreProperties(value = { "hibernateLazyInitializer" }, ignoreUnknown = true)
public class Airline {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@NotBlank(message = "Name is required")
	@Column(name = "name")
	private String name;

	@NotBlank(message = "Iata code is required")
	@Column(name = "iata_code")
	private String iataCode;

	@PositiveOrZero(message = "Fleet size cannot be negative")
	@Column(name = "fleet_size")
	private Integer fleetSize;

	@Column(name = "website")
	private String website;

	@Column(name = "country")
	private String country;

	@OneToMany(mappedBy = "airline", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Flight> flights ;

	public Airline(long id, String name, String iataCode, Integer fleetSize, String website, String country, List<Flight> flights) {
		this.id = id;
		this.name = name;
		this.iataCode = iataCode;
		this.fleetSize = fleetSize;
		this.website = website;
		this.country = country;
		this.flights = flights;
	}

	public Airline() {
	}
}

package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flight")
public class Flight {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "call_sign")
	private String callSign;

	@Column(name = "capacity")
	private Integer capacity;

	@Column(name = "departure_airport")
	private String departureAirport;

	@Column(name = "arrival_airport")
	private String arrivalAirport;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "airline_id")
	@JsonIgnoreProperties("flights")
	private Airline airline;

	public Flight(Long id, String callSign, Integer capacity, String departureAirport, String arrivalAirport, Airline airline) {
		this.id = id;
		this.callSign = callSign;
		this.capacity = capacity;
		this.departureAirport = departureAirport;
		this.arrivalAirport = arrivalAirport;
		this.airline = airline;
	}

	public Flight() {
	}
}

package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.dmg.sdi.domain.entities.User.User;
import javax.persistence.*;
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

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

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

package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.dmg.sdi.domain.entities.User.User;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "flight")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

//	@ManyToOne
//	@JoinColumn(name = "airline_id")
//	private Airline airline;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id", nullable = false)
	private User user;


}

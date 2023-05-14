package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.dmg.sdi.domain.entities.User.User;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking")
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

//	@ManyToOne
//	@JoinColumn(name = "flight_id", referencedColumnName = "id")
//	@JsonIgnoreProperties("bookings")
//	private Flight flight;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "flight_id")
	private Flight flight;

//	@ManyToOne
//	@JoinColumn(name = "passenger_id", referencedColumnName = "id")
//	@JsonIgnoreProperties("bookings")
//	private Passenger passenger;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;


	@Column(name = "seat_number")
	private String seatNumber;

	@NotNull(message = "Booking date is required")
	@Column(name = "booking_date")
	private LocalDate date;

	@Positive(message = "Price must be a positive integer")
	@Column(name = "price")
	private Integer price;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}

package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.dmg.sdi.domain.entities.User.User;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "booking")
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "flight_id", referencedColumnName = "id")
	@JsonIgnoreProperties("bookings")
	private Flight flight;

	@ManyToOne
	@JoinColumn(name = "passenger_id", referencedColumnName = "id")
	@JsonIgnoreProperties("bookings")
	private Passenger passenger;

	@Column(name = "seat_number")
	private String seatNumber;

	@NotNull(message = "Booking date is required")
	@Column(name = "booking_date")
	private LocalDate date;

	@Positive(message = "Price must be a positive integer")
	@Column(name = "price")
	private Integer price;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}

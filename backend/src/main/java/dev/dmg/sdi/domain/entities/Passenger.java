package dev.dmg.sdi.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "passenger")
public class Passenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;

	@Column(name = "nationality")
	private String nationality;

	@Column(name = "passport_number")
	private String passportNumber;

	@OneToMany(mappedBy = "passenger", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Booking> bookings ;



}
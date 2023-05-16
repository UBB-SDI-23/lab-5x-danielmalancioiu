package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.dmg.sdi.domain.entities.User.User;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "passenger")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id", nullable = false)
	private User user;



}

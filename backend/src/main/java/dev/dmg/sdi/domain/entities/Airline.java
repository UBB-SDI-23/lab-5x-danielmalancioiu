package dev.dmg.sdi.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.dmg.sdi.domain.entities.User.User;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "airline")
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

	@NotBlank(message = "website is required")
	@Column(name = "website")
	private String website;

	@NotBlank(message = "Country is required")
	@Column(name = "country")
	private String country;

	@OneToMany(mappedBy = "airline", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Flight> flights ;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id", nullable = false)
	private User user;


}

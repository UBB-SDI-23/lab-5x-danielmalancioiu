package dev.dmg.sdi.domain.entities.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_profiles")
@JsonIgnoreProperties(value = { "hibernateLazyInitializer" }, ignoreUnknown = true)
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "bio")
	private String bio;

	@Column(name = "location")
	private String location;

	@Column(name = "birth_date")
	private LocalDate birthDate;

	@Column(name = "gender")
	private String gender;

	@Column(name = "status")
	private String status;

}

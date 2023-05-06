package dev.dmg.sdi.domain.entities.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
@Entity
@Table(name = "user_profiles")
@JsonIgnoreProperties(value = { "hibernateLazyInitializer" }, ignoreUnknown = true)
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NotEmpty
	@Column(name = "bio")
	private String bio;

	@NotEmpty
	@Column(name = "location")
	private String location;

	@Column(name = "birth_date")
	private Date birthDate;

	@Column(name = "gender")
	private String gender;

	@Column(name = "status")
	private String status;

	public UserProfile(Long id, String bio, String location, Date birthDate, String gender, String status) {
		this.id = id;
		this.bio = bio;
		this.location = location;
		this.birthDate = birthDate;
		this.gender = gender;
		this.status = status;
	}

	public UserProfile() {

	}
}

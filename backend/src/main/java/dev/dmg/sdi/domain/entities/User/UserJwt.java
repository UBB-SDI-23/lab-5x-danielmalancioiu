package dev.dmg.sdi.domain.entities.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table(name = "user_jwts")
@JsonIgnoreProperties(value = { "hibernateLazyInitializer" }, ignoreUnknown = true)
public class UserJwt {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "jwt_token", length = 2000)
	private String jwtToken;

	public UserJwt(Long id, String username, String password, String jwtToken) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.jwtToken = jwtToken;
	}

	public UserJwt() {

	}

}

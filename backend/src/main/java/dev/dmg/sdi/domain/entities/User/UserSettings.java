package dev.dmg.sdi.domain.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_settings")
public class UserSettings {

	@Id
	@Column
	private Long id;

	@Column
	private Integer entitiesPerPage;

}
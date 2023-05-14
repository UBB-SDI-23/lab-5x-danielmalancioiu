package dev.dmg.sdi.exceptions;

import dev.dmg.sdi.domain.entities.User.ERole;

public class RoleNotFoundException extends RuntimeException {

	public RoleNotFoundException(ERole role) {
		super("Could not find role " + role);
	}

}
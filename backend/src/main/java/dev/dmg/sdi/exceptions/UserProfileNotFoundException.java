package dev.dmg.sdi.exceptions;

public class UserProfileNotFoundException extends RuntimeException {

	public UserProfileNotFoundException(Long id) {
		super("Could not find user profile " + id);
	}

}
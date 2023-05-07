package dev.dmg.sdi.exceptions;

public class JwtTokenInvalidException extends RuntimeException {

	public JwtTokenInvalidException(String token) {
		super("Could not validate. Token " + token + " is invalid.");
	}

}
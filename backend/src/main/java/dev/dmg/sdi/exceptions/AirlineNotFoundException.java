package dev.dmg.sdi.exceptions;

public class AirlineNotFoundException extends RuntimeException{

	public AirlineNotFoundException(Long id) {
		super("Could not find airline " + id);
	}
}

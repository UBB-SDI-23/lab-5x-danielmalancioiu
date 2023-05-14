package dev.dmg.sdi.exceptions;

public class FlightNotFoundException extends RuntimeException{

	public FlightNotFoundException(Long id) {
		super("Could not find flight " + id);
	}
}
package dev.dmg.sdi.exceptions;

public class BookingNotFoundException extends RuntimeException{

	public BookingNotFoundException(Long id) {
		super("Could not find booking " + id);
	}
}
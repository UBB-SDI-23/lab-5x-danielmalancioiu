package dev.dmg.sdi.domain.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class PassengerDto {

	private Long id;

	private String firstName;

	private String lastName;

	private LocalDate dateOfBirth;

	private String nationality;

	private String passportNumber;

	private Long numberOfBookings;

	public PassengerDto(Long id, String firstName, String lastName, LocalDate dateOfBirth, String nationality, String passportNumber, Long numberOfBookings) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.passportNumber = passportNumber;
		this.numberOfBookings = numberOfBookings;
	}
}


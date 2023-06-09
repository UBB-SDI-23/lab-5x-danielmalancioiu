package dev.dmg.sdi.domain.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class PassengerBookingDto {

	private Long id;
	private String firstName;
	private String lastName;
	private LocalDate dateOfBirth;
	private String nationality;
	private String passportNumber;
	private Double averagePrice;

	public PassengerBookingDto(Long id, String firstName, String lastName, LocalDate dateOfBirth, String nationality, String passportNumber, Double averagePrice) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.passportNumber = passportNumber;
		this.averagePrice = averagePrice;
	}
}

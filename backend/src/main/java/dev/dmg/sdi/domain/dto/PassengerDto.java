package dev.dmg.sdi.domain.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class PassengerDto {

	private String firstName;

	private String lastName;

	private LocalDate dateOfBirth;

	private String nationality;

	private String passportNumber;

}

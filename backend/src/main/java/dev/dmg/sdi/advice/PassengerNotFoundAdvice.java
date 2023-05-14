package dev.dmg.sdi.advice;

import dev.dmg.sdi.exceptions.PassengerNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PassengerNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(PassengerNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String carNotFoundHandler(PassengerNotFoundException ex) {
		return ex.getMessage();
	}

}
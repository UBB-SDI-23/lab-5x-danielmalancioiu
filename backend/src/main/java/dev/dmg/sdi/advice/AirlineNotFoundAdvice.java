package dev.dmg.sdi.advice;

import dev.dmg.sdi.exceptions.AirlineNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AirlineNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(AirlineNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String carNotFoundHandler(AirlineNotFoundException ex) {
		return ex.getMessage();
	}

}

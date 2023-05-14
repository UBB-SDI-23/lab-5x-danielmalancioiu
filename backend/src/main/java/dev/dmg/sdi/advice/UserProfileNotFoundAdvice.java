package dev.dmg.sdi.advice;

import dev.dmg.sdi.exceptions.UserProfileNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserProfileNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(UserProfileNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String userProfileNotFoundHandler(UserProfileNotFoundException ex) {
		return ex.getMessage();
	}

}
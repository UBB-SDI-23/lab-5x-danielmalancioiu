package dev.dmg.sdi.advice;

import dev.dmg.sdi.exceptions.UserNotAuthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserNotAuthorizedAdvice {

	@ResponseBody
	@ExceptionHandler(UserNotAuthorizedException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String userNotAuthorizedHandler(UserNotAuthorizedException ex) {
		return ex.getMessage();
	}

}
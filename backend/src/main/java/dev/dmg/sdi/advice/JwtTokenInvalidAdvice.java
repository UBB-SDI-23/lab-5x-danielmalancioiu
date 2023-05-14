package dev.dmg.sdi.advice;

import dev.dmg.sdi.exceptions.JwtTokenInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class JwtTokenInvalidAdvice {

	@ResponseBody
	@ExceptionHandler(JwtTokenInvalidException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String jwtTokenInvalidHandler(JwtTokenInvalidException ex) {
		return ex.getMessage();
	}

}
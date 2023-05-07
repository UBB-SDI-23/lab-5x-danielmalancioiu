package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.domain.entities.User.UserProfile;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;


@CrossOrigin(allowCredentials = "true", origins = {"http://localhost:4200", "https://racemasters.netlify.app"})
@RestController
@RequestMapping("/api")
@Validated
public class UserController {

	private final UserService userService;

	private final JwtUtils jwtUtils;

	UserController(UserService userService, JwtUtils jwtUtils) {this.userService = userService;
		this.jwtUtils = jwtUtils;
	}

	@GetMapping("/user-profile-id/{id}")
	UserProfile getProfileById(@PathVariable Long id) {
		return userService.getUserProfileById(id);
	}

	@GetMapping("/user-profile-username/{username}")
	UserProfile getProfileByUsername(@PathVariable String username) {
		return userService.getUserProfileByUsername(username);
	}

	@GetMapping("/user/{username}")
	User getUserByUsername(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}

	@GetMapping("/user-number-airlines/{id}")
	Integer getUserNumberOfAirlinesById(@PathVariable Long id) {
		return userService.getUserNumberOfAirlinesById(id);
	}

	@GetMapping("/user-number-flights/{id}")
	Integer getUserNumberOfFlightsById(@PathVariable Long id) {
		return userService.getUserNumberOfFlightsById(id);
	}

	@GetMapping("/user-number-passengers/{id}")
	Integer getUserNumberOfPassengersById(@PathVariable Long id) {
		return userService.getUserNumberOfPassengersById(id);
	}

//	@GetMapping("/user-search")
//	List<User> getPilotsByName(@RequestParam(required = false) String username) {
//		return this.userService.searchUsersByUsername(username);
//	}

	@PutMapping("/user-profile/{id}")
	UserProfile updateUserProfile(@Valid @RequestBody UserProfile newUserProfile,
			@PathVariable Long id) {

		return userService.updateUserProfile(newUserProfile, id);
	}

//	@PutMapping("/user-roles/{id}")
//	User updateUser(@Valid @RequestBody HashMap<String, Boolean> roles,
//			@PathVariable Long id,
//			@RequestHeader("Authorization") String token) {
//		String username = this.jwtUtils.getUserNameFromJwtToken(token);
//		User user = this.userService.getUserByUsername(username);
//
//		return userService.updateRolesUser(roles, id, user.getId());
//	}

}
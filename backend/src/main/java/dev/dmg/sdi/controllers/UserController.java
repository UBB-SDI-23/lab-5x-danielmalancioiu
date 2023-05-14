package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.SQLRunResponseDTO;
import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.domain.entities.User.UserProfile;
import dev.dmg.sdi.domain.entities.User.UserSettings;
import dev.dmg.sdi.repositories.UserRepository;
import dev.dmg.sdi.repositories.UserSettingsRepository;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;


@CrossOrigin(allowCredentials = "true", origins = {"http://localhost:5173", "https://dmg-frontend.netlify.app"})
@RestController
@RequestMapping("/api")
@Validated
public class UserController {

	private final UserService userService;

	private final UserRepository userRepository;

	private final UserSettingsRepository userSettingsRepository;

	private final JwtUtils jwtUtils;

	UserController(UserService userService, JwtUtils jwtUtils, UserSettingsRepository userSettingsRepository, UserRepository userRepository) {this.userService = userService;
		this.jwtUtils = jwtUtils; this.userSettingsRepository = userSettingsRepository; this.userRepository = userRepository;
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

	@GetMapping("/user-number-airlines/{username}")
	Integer getUserNumberOfAirlinesById(@PathVariable String username) {
		return userService.getUserNumberOfAirlinesById(username);
	}

	@GetMapping("/user-number-flights/{username}")
	Integer getUserNumberOfFlightsById(@PathVariable String username) {
		return userService.getUserNumberOfFlightsById(username);
	}

	@GetMapping("/user-number-passengers/{username}")
	Integer getUserNumberOfPassengersById(@PathVariable String username) {
		return userService.getUserNumberOfPassengersById(username);
	}

	@GetMapping("/user-number-bookings/{username}")
	Integer getUserNumberOfBookingsById(@PathVariable String username) {
		return userService.getUserNumberOfBookingsById(username);
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

	@GetMapping("/user/autocomplete")
	public List<User> autocompleteAirline(@RequestParam String query, @RequestParam int maxResults) {
		return userRepository.findByUsernameContainingIgnoreCaseOrderByUsername(query, PageRequest.of(0, maxResults, Sort.by("username")));
	}

	@GetMapping("/user/rows-per-page/{id}")
	Integer getPageSize(@PathVariable Long id) {
		return this.userSettingsRepository.getById(id).getEntitiesPerPage();
	}

	@PostMapping("/user/rows-per-page")
	ResponseEntity<?> setElementsPerPage(@RequestBody UserSettings settings) {
		UserSettings userSettings = this.userSettingsRepository.getById(settings.getId());
		userSettings.setEntitiesPerPage(settings.getEntitiesPerPage());
		this.userSettingsRepository.save(userSettings);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}

	@PutMapping("/users/rows-per-page/{entitiesPerPage}")
	public ResponseEntity<?> updateEntitiesPerPage(@PathVariable int entitiesPerPage, @RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);
		try {
			userService.updateEntitiesPerPageForAllUsers(entitiesPerPage, user.getId());
			return ResponseEntity.ok("Entities per page setting updated successfully for all users.");
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new SQLRunResponseDTO("Failed to update entities per page setting for all users."));
		}
	}


	@PutMapping("/user-roles/{id}")
	User updateUser(@Valid @RequestBody HashMap<String, Boolean> roles,
			@PathVariable Long id,
			@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		return userService.updateRolesUser(roles, id, user.getId());
	}

}
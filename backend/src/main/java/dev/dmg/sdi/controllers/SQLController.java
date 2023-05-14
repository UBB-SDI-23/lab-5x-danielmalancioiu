package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.SQLRunResponseDTO;
import dev.dmg.sdi.domain.entities.User.ERole;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.exceptions.UserNotAuthorizedException;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin(allowCredentials = "true", origins = {"http://localhost:5173", "https://dmg-frontend.netlify.app"})
@RestController
@RequestMapping("/api")
@Validated
public class SQLController {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final JwtUtils jwtUtils;

	private final UserService userService;

	public SQLController(JwtUtils jwtUtils, UserService userService) {
		this.jwtUtils = jwtUtils;
		this.userService = userService;
	}

	@PostMapping("/run-delete-airlines-script")
	ResponseEntity<?> deleteAllAirlines(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String sql = Files.readString(Paths.get(currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/delete_airlines.sql"));
			//String sql = Files.readString(Paths.get(currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/delete_airlines.sql"));
			jdbcTemplate.update(sql);
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully deleted all airlines"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong (make sure you deleted flights first)"));
		}
	}

	@PostMapping("/run-delete-flights-script")
	ResponseEntity<?> deleteAllFlights(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String sql = Files.readString(Paths.get(currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/delete_flights.sql"));
			//String sql = Files.readString(Paths.get(currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/delete_flights.sql"));
			jdbcTemplate.update(sql);
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully deleted all flights"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong (make sure you deleted bookings first)"));
		}
	}

	@PostMapping("/run-delete-passengers-script")
	ResponseEntity<?> deleteAllPassengers(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);
		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			System.out.println("Current directory: " + currentDir);

			//String sql = Files.readString(Paths.get(currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/delete_passengers.sql"));
			String sql = Files.readString(Paths.get(currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/delete_passengers.sql"));
			jdbcTemplate.update(sql);
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully deleted all passengers"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong (make sure you deleted bookings first)"));
		}
	}

	@PostMapping("/run-delete-bookings-script")
	ResponseEntity<?> deleteAllBookings(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String sql = Files.readString(Paths.get(currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/delete_bookings.sql"));
			//String sql = Files.readString(Paths.get(currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/delete_bookings.sql"));
			jdbcTemplate.update(sql);
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully deleted all bookings"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong"));
		}
	}

	@PostMapping("/run-insert-flights-script")
	ResponseEntity<?> insertAllFlights(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String fullPath = currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/insert_flights.sql";
			//String fullPath = currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/insert_flights.sql";
			BufferedReader reader = new BufferedReader(new FileReader(fullPath));
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				jdbcTemplate.update(line);
			}
			reader.close();
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully inserted all flights"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong (make sure you inserted the airlines first)"));
		}
	}

	@PostMapping("/run-insert-airlines-script")
	ResponseEntity<?> insertAllAirlines(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String fullPath = currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/insert_airlines.sql";
			//String fullPath = currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/insert_airlines.sql";
			BufferedReader reader = new BufferedReader(new FileReader(fullPath));
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				jdbcTemplate.update(line);
			}
			reader.close();
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully inserted all airlines"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong"));
		}
	}

	@PostMapping("/run-insert-passengers-script")
	ResponseEntity<?> insertAllRaces(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String fullPath = currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/insert_passengers.sql";
			//String fullPath = currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/insert_passengers.sql";
			BufferedReader reader = new BufferedReader(new FileReader(fullPath));
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				jdbcTemplate.update(line);
			}
			reader.close();
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully inserted all passengers"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong"));
		}
	}

	@PostMapping("/run-insert-bookings-script")
	ResponseEntity<?> insertAllBookings(@RequestHeader("Authorization") String token) {
		String username = this.jwtUtils.getUserNameFromJwtToken(token);
		User user = this.userService.getUserByUsername(username);

		boolean isAdmin = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);

		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}
		try {
			String currentDir = System.getProperty("user.dir");
			String fullPath = currentDir + "/../src/main/java/dev/dmg/sdi/SQLScripts/insert_bookings.sql";
			//String fullPath = currentDir + "/src/main/java/dev/dmg/sdi/SQLScripts/insert_bookings.sql";
			BufferedReader reader = new BufferedReader(new FileReader(fullPath));
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				jdbcTemplate.update(line);
			}
			reader.close();
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Successfully inserted all bookings"));
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new SQLRunResponseDTO("Error: something went wrong (make sure you inserted flights and passengers first)"));
		}
	}
}
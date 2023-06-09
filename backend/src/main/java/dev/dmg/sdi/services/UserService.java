package dev.dmg.sdi.services;

import dev.dmg.sdi.domain.entities.User.*;
import dev.dmg.sdi.exceptions.RoleNotFoundException;
import dev.dmg.sdi.exceptions.UserNotAuthorizedException;
import dev.dmg.sdi.exceptions.UserNotFoundException;
import dev.dmg.sdi.exceptions.UserProfileNotFoundException;
import dev.dmg.sdi.repositories.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class UserService {


	private final UserRepository userRepository;

	private final AirlineRepository airlineRepository;

	private final FlightRepository flightRepository;

	private final PassengerRepository passengerRepository;

	private final BookingRepository bookingRepository;

	private final UserProfileRepository userProfileRepository;

	private final RoleRepository roleRepository;

	private final UserSettingsRepository userSettingsRepository;

	private final JdbcTemplate jdbcTemplate;



	public UserService(UserRepository userRepository, AirlineRepository airlineRepository, FlightRepository flightRepository, PassengerRepository passengerRepository, UserProfileRepository userProfileRepository, BookingRepository bookingRepository, RoleRepository roleRepository, UserSettingsRepository userSettingsRepository, JdbcTemplate jdbcTemplate)  {
		this.userRepository = userRepository;
		this.airlineRepository = airlineRepository;
		this.flightRepository = flightRepository;
		this.passengerRepository = passengerRepository;
		this.userProfileRepository = userProfileRepository;
		this.bookingRepository = bookingRepository;
		this.roleRepository = roleRepository;
		this.userSettingsRepository = userSettingsRepository;
		this.jdbcTemplate = jdbcTemplate;

	}

	public UserProfile getUserProfileById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException(id));
		return user.getUserProfile();
	}

	public UserProfile getUserProfileByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException(username));
		return user.getUserProfile();
	}

	public User getUserByUsername(String username) {
		return this.userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
	}

	public Integer getUserNumberOfAirlinesById(String username) {
		return airlineRepository.findByUser_Username(username).size();
	}

	public Integer getUserNumberOfFlightsById(String username) {
		return flightRepository.findByUser_Username(username).size();
	}

	public Integer getUserNumberOfPassengersById(String username) {
		return passengerRepository.findByUser_Username(username).size();
	}

	public Integer getUserNumberOfBookingsById(String username) {
		return bookingRepository.findByUser_Username(username).size();
	}

//	public List<User> searchUsersByUsername(String username) {
//		return this.userRepository.findTop20BySearchTerm(username);
//	}

	public UserProfile updateUserProfile(UserProfile newUserProfile, Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException(id));

		boolean isUser = user.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_USER
		);
		if (!isUser) {
			throw new UserNotAuthorizedException(String.format(user.getUsername()));
		}

		return userProfileRepository.findById(user.getUserProfile().getId())
				.map(userProfile -> {
					userProfile.setBio(newUserProfile.getBio());
					userProfile.setLocation(newUserProfile.getLocation());
					userProfile.setGender(newUserProfile.getGender());
					userProfile.setStatus(newUserProfile.getStatus());
					userProfile.setBirthDate(newUserProfile.getBirthDate());
					return userProfileRepository.save(userProfile);
				})
				.orElseThrow(() -> new UserProfileNotFoundException(id));
	}

	public User updateRolesUser(HashMap<String, Boolean> roles, Long id, Long userID) {
		User callerUser = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));

		boolean isAdmin = callerUser.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);
		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(callerUser.getUsername()));
		}

		User user = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

		Set<Role> roleSet = new HashSet<>();
		if (roles.get("isUser")) {
			Role role = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RoleNotFoundException(ERole.ROLE_USER));
			roleSet.add(role);
		}
		if (roles.get("isModerator")){
			Role role = roleRepository.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RoleNotFoundException(ERole.ROLE_MODERATOR));
			roleSet.add(role);
		}
		if (roles.get("isAdmin")){
			Role role = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RoleNotFoundException(ERole.ROLE_ADMIN));
			roleSet.add(role);
		}
		user.setRoles(roleSet);
		return userRepository.save(user);
	}

	public void updateEntitiesPerPageForAllUsers(int entitiesPerPage, Long userID) {

		User callerUser = this.userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));

		boolean isAdmin = callerUser.getRoles().stream().anyMatch((role) ->
				role.getName() == ERole.ROLE_ADMIN
		);
		if (!isAdmin) {
			throw new UserNotAuthorizedException(String.format(callerUser.getUsername()));
		}

		String sql = "UPDATE user_settings SET entities_per_page = ?";
		jdbcTemplate.update(sql, entitiesPerPage);

	}
}
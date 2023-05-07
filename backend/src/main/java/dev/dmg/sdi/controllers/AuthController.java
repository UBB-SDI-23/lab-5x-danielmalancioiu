package dev.dmg.sdi.controllers;

import dev.dmg.sdi.domain.dto.RegisterDto;
import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.domain.entities.User.UserJwt;
import dev.dmg.sdi.domain.entities.User.UserProfile;
import dev.dmg.sdi.exceptions.JwtTokenInvalidException;
import dev.dmg.sdi.repositories.UserJwtRepository;
import dev.dmg.sdi.repositories.UserProfileRepository;
import dev.dmg.sdi.repositories.UserRepository;
import dev.dmg.sdi.security.Jwt.JwtUtils;
import dev.dmg.sdi.security.Payload.request.LoginRequest;
import dev.dmg.sdi.security.Payload.request.SignupRequest;
import dev.dmg.sdi.security.Payload.response.MessageResponse;
import dev.dmg.sdi.security.Payload.response.UserInfoResponse;
import dev.dmg.sdi.security.Services.UserDetailsImpl;
import javax.transaction.Transactional;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(allowCredentials = "true", origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
	AuthenticationManager authenticationManager;

	UserRepository userRepository;

	UserProfileRepository userProfileRepository;

	UserJwtRepository userJwtRepository;

//	RoleRepository roleRepository;

	PasswordEncoder encoder;

	JwtUtils jwtUtils;

	public AuthController(AuthenticationManager authenticationManager,
			UserRepository userRepository,
			UserProfileRepository userProfileRepository,
			UserJwtRepository userJwtRepository,
//			RoleRepository roleRepository,
			PasswordEncoder encoder,
			JwtUtils jwtUtils) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.userProfileRepository = userProfileRepository;
		this.userJwtRepository = userJwtRepository;
//		this.roleRepository = roleRepository;
		this.encoder = encoder;
		this.jwtUtils = jwtUtils;
	}

	@Transactional
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userJwtRepository.existsByUsername(signUpRequest.getUsername())) {
			userJwtRepository.deleteByUsername(signUpRequest.getUsername());
		}

		String jwtToken = jwtUtils.generateTokenFromUsernameRegister(signUpRequest.getUsername()).getValue();

		UserJwt userJwtPair = new UserJwt();
		userJwtPair.setUsername(signUpRequest.getUsername());
		userJwtPair.setPassword(encoder.encode(signUpRequest.getPassword()));
		userJwtPair.setJwtToken(jwtToken);

		userJwtRepository.save(userJwtPair);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new RegisterDto(userJwtPair.getUsername(), userJwtPair.getJwtToken()));
	}

	@PostMapping("register/confirm/{jwtToken}")
	public ResponseEntity<?> confirmUser(@PathVariable String jwtToken) {

		if (!userJwtRepository.existsByJwtToken(jwtToken)) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Token is invalid!"));
		}

		UserJwt userJwt = userJwtRepository.findByJwtToken(jwtToken);
		if (! jwtUtils.validateJwtToken(userJwt.getJwtToken()))
			throw new JwtTokenInvalidException(userJwt.getJwtToken());

		User user = new User();
		UserProfile userProfile = new UserProfile();
		userProfileRepository.save(userProfile);

		user.setUsername(userJwt.getUsername());
		user.setPassword(userJwt.getPassword());
		user.setUserProfile(userProfile);

//		Set<Role> roles = new HashSet<>();
//		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//				.orElseThrow(() -> new RuntimeException("Error: User role not found."));
//		roles.add(userRole);
//		user.setRoles(roles);
//		user.setUserProfile(userProfile);

		userJwtRepository.delete(userJwt);

		userRepository.save(user);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new MessageResponse("Successfully confirmed the registration code!"));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		String jwtCookie = jwtUtils.generateTokenFromUsernameSignIn(userDetails.getUsername()).getValue();

//		List<String> roles = userDetails.getAuthorities().stream()
//				.map(GrantedAuthority::getAuthority)
//				.collect(Collectors.toList());

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new UserInfoResponse(userDetails.getId(),
						userDetails.getUsername(),
//						roles,
						jwtCookie));
	}

	@PostMapping("/signout")
	public ResponseEntity<?> logoutUser() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new MessageResponse("You've been signed out!"));
	}
}
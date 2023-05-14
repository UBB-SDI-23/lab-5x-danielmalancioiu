package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.User.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByUsernameContainingIgnoreCaseOrderByUsername(String query, Pageable pageable);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);
}

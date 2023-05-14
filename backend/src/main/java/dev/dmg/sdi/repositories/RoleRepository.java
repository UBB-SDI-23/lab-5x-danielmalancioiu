package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.User.ERole;
import dev.dmg.sdi.domain.entities.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(ERole name);

}
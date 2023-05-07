package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.domain.entities.User.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}

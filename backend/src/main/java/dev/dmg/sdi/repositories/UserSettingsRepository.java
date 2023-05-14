package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.User.User;
import dev.dmg.sdi.domain.entities.User.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
}

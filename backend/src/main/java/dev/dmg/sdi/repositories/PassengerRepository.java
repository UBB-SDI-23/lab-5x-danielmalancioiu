package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
}

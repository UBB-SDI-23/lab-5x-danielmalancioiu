package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository  extends JpaRepository<Flight, Long> {
}

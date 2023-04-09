package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Flight;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository  extends JpaRepository<Flight, Long> {
	List<Flight> findByCallSignContainingIgnoreCaseOrderByCallSign(String query, PageRequest name);
}

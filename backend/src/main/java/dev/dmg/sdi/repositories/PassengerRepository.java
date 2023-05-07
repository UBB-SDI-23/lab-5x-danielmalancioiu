package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Airline;
import dev.dmg.sdi.domain.entities.Passenger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
	List<Passenger> findByFirstNameContainingIgnoreCaseOrderByFirstName(String query, PageRequest name);

	List<Passenger> findByUserId(Long id);
}

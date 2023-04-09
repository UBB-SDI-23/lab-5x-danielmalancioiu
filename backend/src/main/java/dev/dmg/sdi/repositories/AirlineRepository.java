package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Airline;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AirlineRepository extends JpaRepository<Airline, Long> {

	List<Airline> findByFleetSizeGreaterThan(Integer fleetSize);

	List<Airline> findByNameContainingIgnoreCaseOrderByName(String query, PageRequest name);

}

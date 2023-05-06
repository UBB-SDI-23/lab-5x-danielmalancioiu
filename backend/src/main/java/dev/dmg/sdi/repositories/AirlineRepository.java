package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.entities.Airline;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AirlineRepository extends JpaRepository<Airline, Long> {

	Page<Airline> findByFleetSizeGreaterThan(Integer fleetSize, Pageable pageable);

	List<Airline> findByNameContainingIgnoreCaseOrderByName(String query, PageRequest name);

}

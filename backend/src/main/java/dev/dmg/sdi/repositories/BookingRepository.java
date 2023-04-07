package dev.dmg.sdi.repositories;

import dev.dmg.sdi.domain.dto.BookingDto;
import dev.dmg.sdi.domain.entities.Booking;
import dev.dmg.sdi.domain.entities.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findAllByFlightId(Long flight);

	List<Booking> findAllByPassengerId(Long passenger);

}

package com.digitalclinic.Digital.Clinic.repositories;

import com.digitalclinic.Digital.Clinic.entities.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic,Integer> {
    List<Clinic> findByNameContains(String name);

    List<Clinic> findByDoctors_specialist(String specialist);
    List<Clinic> findByAddress(Integer addressId);
}

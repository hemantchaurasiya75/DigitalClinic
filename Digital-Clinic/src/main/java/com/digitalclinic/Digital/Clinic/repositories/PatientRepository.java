package com.digitalclinic.Digital.Clinic.repositories;

import com.digitalclinic.Digital.Clinic.entities.Clinic;
import com.digitalclinic.Digital.Clinic.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer> {
    @Query("select p from Patient p where p.firstname like :key")
    List<Patient> findByFirstname(@Param("key") String name);
    List<Patient> findByPhone(String phone);
    Patient findByEmail(String email);
}

package com.digitalclinic.Digital.Clinic.repositories;

import com.digitalclinic.Digital.Clinic.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer> {
    List<Doctor> findByPhone(String phone);

    @Query("select d from Doctor d where d.firstname like :key")
    List<Doctor> searchDoctorByName(@Param("key") String name);

    @Query("select d from Doctor d where :specialist in elements(d.specialist)")
    List<Doctor> findBySpecialist(@Param("specialist") String specialist);
}

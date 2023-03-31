package com.digitalclinic.Digital.Clinic.repositories;

import com.digitalclinic.Digital.Clinic.entities.Consultant;
import com.digitalclinic.Digital.Clinic.entities.Doctor;
import com.digitalclinic.Digital.Clinic.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant,Integer> {
    List<Consultant> findByPatient(Patient patient);
    List<Consultant> findByDoctor(Doctor doctor);
}

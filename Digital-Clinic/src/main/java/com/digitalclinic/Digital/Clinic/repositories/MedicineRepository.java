package com.digitalclinic.Digital.Clinic.repositories;

import com.digitalclinic.Digital.Clinic.entities.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine,Integer> {
    List<Medicine> findByPatient_Userid(Integer patientId);
}

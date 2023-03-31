package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.ConsultantDto;

import java.util.List;

public interface ConsultantService {
    ConsultantDto createConsultant(Integer patientId,Integer doctorId,Integer medicineId,Integer clinicId);

    ConsultantDto getConsultantById(Integer id);

    List<ConsultantDto> getConsultantByPatient(Integer id);

    List<ConsultantDto> getConsultantByDoctor(Integer id);
}

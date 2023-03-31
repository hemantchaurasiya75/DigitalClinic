package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.PatientDto;

import java.util.List;

public interface PatientService {
    PatientDto registerPatient(PatientDto patientDto);
    PatientDto getPatientById(Integer id);
    List<PatientDto> getPatientByName(String name);
    List<PatientDto> getPatientByPhone(String phone);
    PatientDto getPatientByEmail(String email);
    List<PatientDto> getAllPatients();
    PatientDto updatePatient(PatientDto patientDto,Integer id);
    void deletePatient(Integer id);
}

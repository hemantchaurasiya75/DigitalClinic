package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.ClinicDto;

import java.util.List;

public interface ClinicService {
    ClinicDto registerClinic(ClinicDto clinicDto);
    ClinicDto searchClinicById(Integer id);
    List<ClinicDto> searchClinicByName(String name);
    List<ClinicDto> searchAllClinics();
    List<ClinicDto> searchClinicBySpecialistDoctors(String specialist);
    List<ClinicDto> searchClinicByAddress(String address);
    ClinicDto updateClinic(ClinicDto clinicDto,Integer id);
    void deleteClinic(Integer id);
}

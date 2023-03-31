package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.DoctorDto;

import java.util.List;

public interface DoctorService {
    DoctorDto registerDoctor(Integer clinicId,DoctorDto doctorDto);
    DoctorDto updateDoctor(DoctorDto doctorDto,Integer id);
    DoctorDto getDoctorById(Integer id);
    List<DoctorDto> getDoctorByName(String name);
    List<DoctorDto> getDoctorByPhone(String phone);
    List<DoctorDto> getAllDoctors();
    void deleteDoctor(Integer id);
}

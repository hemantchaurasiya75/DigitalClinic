package com.digitalclinic.Digital.Clinic.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ConsultantDto {
    private Integer id;
    private PatientDto patient;
    private DoctorDto doctor;
    private MedicineDto medicine;
    private ClinicDto clinic;
}

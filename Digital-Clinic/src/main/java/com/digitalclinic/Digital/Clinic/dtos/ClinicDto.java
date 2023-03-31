package com.digitalclinic.Digital.Clinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClinicDto {
    private Integer id;
    private String name;
    private AddressDto address;
    private String openingTime;
    private String closingTime;
    private List<DoctorDto> doctors;
}

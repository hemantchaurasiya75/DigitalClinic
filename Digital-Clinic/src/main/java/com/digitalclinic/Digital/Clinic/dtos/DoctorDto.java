package com.digitalclinic.Digital.Clinic.dtos;

import com.digitalclinic.Digital.Clinic.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto extends UserDto{
    private AddressDto address;
    private int age;
    private String image;
    private String department;
    private List<String> specialist;
    private List<String> education;
    private List<ClinicDto> clinics;
}

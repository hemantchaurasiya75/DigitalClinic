package com.digitalclinic.Digital.Clinic.dtos;

import com.digitalclinic.Digital.Clinic.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto extends UserDto{
    private AddressDto address;
    private int age;
    private String image;
    private float height;
    private float weight;
    private String bloodGroup;
}

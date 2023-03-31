package com.digitalclinic.Digital.Clinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddressDto {
    private Integer id;
    private String place;
    private String city;
    private String state;
    private String country;
}

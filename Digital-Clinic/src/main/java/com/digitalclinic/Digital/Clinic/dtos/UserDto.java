package com.digitalclinic.Digital.Clinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer userid;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String role;
}
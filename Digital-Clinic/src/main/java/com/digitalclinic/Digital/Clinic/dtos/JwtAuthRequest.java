package com.digitalclinic.Digital.Clinic.dtos;

import lombok.Data;

@Data
public class JwtAuthRequest {
    private String username;
    private String password;
}

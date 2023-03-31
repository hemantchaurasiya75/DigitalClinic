package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.UserDto;

public interface UserService {
    UserDto saveUser(UserDto userDto);
    UserDto loginUser(String email,String password);

}

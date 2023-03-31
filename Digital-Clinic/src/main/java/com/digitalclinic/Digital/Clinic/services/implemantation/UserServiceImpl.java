package com.digitalclinic.Digital.Clinic.services.implemantation;

import com.digitalclinic.Digital.Clinic.dtos.UserDto;
import com.digitalclinic.Digital.Clinic.entities.User;
import com.digitalclinic.Digital.Clinic.exceptions.UserNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.UserRepository;
import com.digitalclinic.Digital.Clinic.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public UserDto saveUser(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserDto.class);
    }

    @Override
    public UserDto loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException("user not found"));
        if (user.getPassword().equals(password)){
            return modelMapper.map(user,UserDto.class);
        }
        return null;
    }
}

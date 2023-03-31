package com.digitalclinic.Digital.Clinic.controllers;

import com.digitalclinic.Digital.Clinic.dtos.JwtAuthRequest;
import com.digitalclinic.Digital.Clinic.dtos.JwtAuthResponse;
import com.digitalclinic.Digital.Clinic.dtos.LoginDto;
import com.digitalclinic.Digital.Clinic.dtos.UserDto;
import com.digitalclinic.Digital.Clinic.entities.User;
import com.digitalclinic.Digital.Clinic.exceptions.ApiException;
import com.digitalclinic.Digital.Clinic.security.JwtTokenHelper;
import com.digitalclinic.Digital.Clinic.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto){
        System.out.println(userDto);
        UserDto savedUser = userService.saveUser(userDto);
        System.out.println(savedUser);
        return new ResponseEntity<UserDto>(savedUser,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@Valid @RequestBody JwtAuthRequest request)throws Exception{
        System.out.println("ooooooooooooooooooooooo");
        System.out.println(request);
        this.authenticate(request.getUsername(),request.getPassword());
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        System.out.println(userDetails);
        String token = jwtTokenHelper.generateToken(userDetails);
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        System.out.println(response);
        response.setUser(modelMapper.map((User)userDetails,UserDto.class));
        return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
    }

    private void authenticate(String username,String password)throws Exception{
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username,password);
        try {
            System.out.println("kkkkkkkkkkkkkkkkk");
            System.out.println(authenticationToken);
            authenticationManager.authenticate(authenticationToken);
            System.out.println("jjjjjjjjjjjjjjjjj");
        }catch (BadCredentialsException e){
            System.out.println("Invalid Detials !!");
            throw new ApiException("Invalid username or password !!");
        }
    }
}

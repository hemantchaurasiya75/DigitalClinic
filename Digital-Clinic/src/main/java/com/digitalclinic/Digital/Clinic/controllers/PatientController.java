package com.digitalclinic.Digital.Clinic.controllers;

import com.digitalclinic.Digital.Clinic.dtos.PatientDto;
import com.digitalclinic.Digital.Clinic.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<PatientDto> registerDoctor(@Valid @RequestBody PatientDto patientDto){
        PatientDto patient = patientService.registerPatient(patientDto);
        return new ResponseEntity<PatientDto>(patient,HttpStatus.CREATED);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable("patientId") Integer id){
        PatientDto patientDto = patientService.getPatientById(id);
        return new ResponseEntity<PatientDto>(patientDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PatientDto>> getAllPatients(){
        List<PatientDto> patientDtoList = patientService.getAllPatients();
        return new ResponseEntity<List<PatientDto>>(patientDtoList,HttpStatus.OK);
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<PatientDto> updatePatient(
            @RequestBody PatientDto patientDto,
            @PathVariable("patientId") Integer id
    ){
        PatientDto savedPatient = patientService.updatePatient(patientDto,id);
        return new ResponseEntity<PatientDto>(savedPatient,HttpStatus.OK);
    }

    @DeleteMapping("/{patientId}")
    public ResponseEntity<String> deletePatient(@PathVariable("patientId") Integer id){
        patientService.deletePatient(id);
        return new ResponseEntity<String>("Patient is deleted", HttpStatus.OK);
    }

    @GetMapping("/search-by-phone/{phone}")
    public ResponseEntity<List<PatientDto>> searchPatient(@PathVariable("phone") String phone){
        List<PatientDto> patientDtos = patientService.getPatientByPhone(phone);
        return new ResponseEntity<List<PatientDto>>(patientDtos,HttpStatus.OK);
    }

    @GetMapping("/search-by-name/{name}")
    public ResponseEntity<List<PatientDto>> searchPatientByName(@PathVariable("name") String name){
        List<PatientDto> patientDtos = patientService.getPatientByName(name);
        return new ResponseEntity<List<PatientDto>>(patientDtos,HttpStatus.OK);
    }
}

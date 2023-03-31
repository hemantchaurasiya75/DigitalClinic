package com.digitalclinic.Digital.Clinic.controllers;

import com.digitalclinic.Digital.Clinic.dtos.ClinicDto;
import com.digitalclinic.Digital.Clinic.services.ClinicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clinic")
public class ClinicController {
    @Autowired
    private ClinicService clinicService;

    @PostMapping
    public ResponseEntity<ClinicDto> registerClinic(@Valid @RequestBody ClinicDto clinicDto){
        ClinicDto clinic = clinicService.registerClinic(clinicDto);
        return new ResponseEntity<ClinicDto>(clinic, HttpStatus.CREATED);
    }

    @GetMapping("/{clinicId}")
    public ResponseEntity<ClinicDto> getClinicById(@PathVariable("clinicId") Integer clinicId){
        ClinicDto clinicDto = clinicService.searchClinicById(clinicId);
        return new ResponseEntity<ClinicDto>(clinicDto,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ClinicDto>> getAllClinics(){
        List<ClinicDto> clinicDtoList = clinicService.searchAllClinics();
        return new ResponseEntity<List<ClinicDto>>(clinicDtoList,HttpStatus.OK);
    }

    @PutMapping("/{clinicId}")
    public ResponseEntity<ClinicDto> updateClinic(
            @Valid
            @RequestBody ClinicDto clinicDto,
            @PathVariable("clinicId") Integer clinicId
    ){
        ClinicDto updatedClinic = clinicService.updateClinic(clinicDto,clinicId);
        return new ResponseEntity<ClinicDto>(updatedClinic,HttpStatus.OK);
    }

    @DeleteMapping("/{clinicId}")
    public ResponseEntity<String> deleteClinic(@PathVariable("clinicId") Integer clinicId){
        clinicService.deleteClinic(clinicId);
        return new ResponseEntity<String>("Clinic deleted Successfully!",HttpStatus.OK);
    }

    @GetMapping("/search-by-clinic-name/{name}")
    public ResponseEntity<List<ClinicDto>> searchClinics(@PathVariable("name") String name){
        List<ClinicDto> clinicDtoList = clinicService.searchClinicByName(name);
        return new ResponseEntity<List<ClinicDto>>(clinicDtoList,HttpStatus.OK);
    }

    @GetMapping("/search-by-specialist/{specialist}")
    public ResponseEntity<List<ClinicDto>> searchClinicsBySpecialist(@PathVariable("specialist") String specialist){
        List<ClinicDto> clinicDtoList = clinicService.searchClinicBySpecialistDoctors(specialist);
        return new ResponseEntity<List<ClinicDto>>(clinicDtoList,HttpStatus.OK);
    }
}
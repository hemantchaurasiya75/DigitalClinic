package com.digitalclinic.Digital.Clinic.controllers;

import com.digitalclinic.Digital.Clinic.dtos.ConsultantDto;
import com.digitalclinic.Digital.Clinic.services.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/consultant")
public class ConsultantController {
    @Autowired
    private ConsultantService consultantService;

    @GetMapping("/{patientId}/{doctorId}/{medicineId}/{clinicId}")
    public ResponseEntity<ConsultantDto> createConsultant(
            @PathVariable("patientId") Integer patientId,
            @PathVariable("doctorId") Integer doctorId,
            @PathVariable("medicineId") Integer medicineId,
            @PathVariable("clinicId") Integer clinicId
    ){
        ConsultantDto consultantDto = consultantService.createConsultant(
                patientId,doctorId,medicineId,clinicId
        );
        return new ResponseEntity<ConsultantDto>(consultantDto, HttpStatus.OK);
    }

    @GetMapping("/get/{consultantId}")
    public ResponseEntity<ConsultantDto> createConsultant(
            @PathVariable("consultantId") Integer consultantId
    ){
        ConsultantDto consultantDto = consultantService.getConsultantById(consultantId);
        return new ResponseEntity<ConsultantDto>(consultantDto, HttpStatus.OK);
    }

    @GetMapping("/by-patient/{patientId}")
    public ResponseEntity<List<ConsultantDto>> getConsultantByPatientId(
            @PathVariable("patientId") Integer patientId
    ){
        List<ConsultantDto> consultants = consultantService.getConsultantByPatient(patientId);
        return new ResponseEntity<List<ConsultantDto>>(consultants, HttpStatus.OK);
    }

    @GetMapping("/by-doctor/{doctorId}")
    public ResponseEntity<List<ConsultantDto>> getConsultantByDoctorId(
            @PathVariable("doctorId") Integer doctorId
    ){
        List<ConsultantDto> consultants = consultantService.getConsultantByDoctor(doctorId);
        return new ResponseEntity<List<ConsultantDto>>(consultants, HttpStatus.OK);
    }
}

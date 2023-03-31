package com.digitalclinic.Digital.Clinic.controllers;

import com.digitalclinic.Digital.Clinic.dtos.MedicineDto;
import com.digitalclinic.Digital.Clinic.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medicine")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/{patientId}")
    public ResponseEntity<MedicineDto> createMedicine(
            @PathVariable("patientId") Integer patientId,
            @RequestBody MedicineDto medicineDto
    ){
        MedicineDto savedMedicine = medicineService.createMedicine(patientId,medicineDto);
        return new ResponseEntity<MedicineDto>(savedMedicine, HttpStatus.CREATED);
    }

    @GetMapping("/{medicineId}")
    public ResponseEntity<MedicineDto> getMedicineById(
            @PathVariable("medicineId") Integer id
    ){
        MedicineDto medicineDto = medicineService.getMedicineById(id);
        return new ResponseEntity<MedicineDto>(medicineDto,HttpStatus.OK);
    }

    @GetMapping("/patient-all-medicines/{patientId}")
    public ResponseEntity<List<MedicineDto>> getAllMedicineOfPatient(
            @PathVariable("patientId") Integer id
    ){
        List<MedicineDto> medicineDtoList = medicineService.getAllMedicineOfPatient(id);
        return new ResponseEntity<List<MedicineDto>>(medicineDtoList,HttpStatus.OK);
    }

    @PutMapping("/{medicineId}")
    public ResponseEntity<MedicineDto> updateMedicine(
            @PathVariable("medicineId") Integer id,
            @RequestBody MedicineDto medicineDto
    ){
        MedicineDto updatedMedicine = medicineService.updateMedicine(medicineDto,id);
        return new ResponseEntity<MedicineDto>(updatedMedicine,HttpStatus.OK);
    }

    @DeleteMapping("/{medicineId}")
    public ResponseEntity<String> deleteMedicine(
            @PathVariable("medicineId") Integer id
    ){
        medicineService.deleteMedicine(id);
        return new ResponseEntity<String>("medicine deleted",HttpStatus.OK);
    }
}
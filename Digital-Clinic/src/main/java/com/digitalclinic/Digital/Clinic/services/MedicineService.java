package com.digitalclinic.Digital.Clinic.services;

import com.digitalclinic.Digital.Clinic.dtos.MedicineDto;

import java.util.List;

public interface MedicineService {
    MedicineDto createMedicine(Integer patientId,MedicineDto medicineDto);
    MedicineDto getMedicineById(Integer id);
    List<MedicineDto> getAllMedicineOfPatient(Integer patientId);
    MedicineDto updateMedicine(MedicineDto medicineDto,Integer id);
    void deleteMedicine(Integer id);
}

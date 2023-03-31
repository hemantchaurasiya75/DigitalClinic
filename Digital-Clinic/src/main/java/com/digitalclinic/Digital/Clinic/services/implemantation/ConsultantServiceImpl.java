package com.digitalclinic.Digital.Clinic.services.implemantation;

import com.digitalclinic.Digital.Clinic.dtos.*;
import com.digitalclinic.Digital.Clinic.entities.*;
import com.digitalclinic.Digital.Clinic.exceptions.ResourceNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.*;
import com.digitalclinic.Digital.Clinic.services.ConsultantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultantServiceImpl implements ConsultantService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ConsultantDto createConsultant(Integer patientId, Integer doctorId, Integer medicineId, Integer clinicId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(()->new ResourceNotFoundException("Patients","id",patientId));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(()->new ResourceNotFoundException("Doctor","id",doctorId));

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(()->new ResourceNotFoundException("Medicine","id",medicineId));

        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(()->new ResourceNotFoundException("Clinic","id",clinicId));

        Consultant consultant = new Consultant();
        consultant.setPatient(patient);
        consultant.setDoctor(doctor);
        consultant.setMedicine(medicine);
        consultant.setClinic(clinic);
        Consultant savedConsultant = consultantRepository.save(consultant);
        ConsultantDto consultantDto = modelMapper.map(savedConsultant,ConsultantDto.class);
        return consultantDto;
    }

    @Override
    public ConsultantDto getConsultantById(Integer id) {
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Consultant","id",id));
        return modelMapper.map(consultant,ConsultantDto.class);
    }

    @Override
    public List<ConsultantDto> getConsultantByPatient(Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patient","id",id));
        List<Consultant> consultants = consultantRepository.findByPatient(patient);
        List<ConsultantDto> consultantDtoList = consultants.stream()
                .map(consultant -> modelMapper.map(consultant,ConsultantDto.class)).collect(Collectors.toList());
        return consultantDtoList;
    }

    @Override
    public List<ConsultantDto> getConsultantByDoctor(Integer id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Doctor","id",id));
        List<Consultant> consultants = consultantRepository.findByDoctor(doctor);
        List<ConsultantDto> consultantDtoList = consultants.stream()
                .map(consultant -> modelMapper.map(consultant,ConsultantDto.class)).collect(Collectors.toList());
        return consultantDtoList;
    }
}

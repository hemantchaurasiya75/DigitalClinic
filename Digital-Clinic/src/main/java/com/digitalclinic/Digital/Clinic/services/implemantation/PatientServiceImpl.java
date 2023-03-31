package com.digitalclinic.Digital.Clinic.services.implemantation;

import com.digitalclinic.Digital.Clinic.dtos.Role;
import com.digitalclinic.Digital.Clinic.entities.Address;
import com.digitalclinic.Digital.Clinic.dtos.PatientDto;
import com.digitalclinic.Digital.Clinic.entities.Patient;
import com.digitalclinic.Digital.Clinic.exceptions.ResourceNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.AddressRepository;
import com.digitalclinic.Digital.Clinic.repositories.PatientRepository;
import com.digitalclinic.Digital.Clinic.services.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public PatientDto registerPatient(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setFirstname(patientDto.getFirstname());
        patient.setLastname(patientDto.getLastname());
        patient.setEmail(patientDto.getEmail());
        patient.setPassword(passwordEncoder.encode(patientDto.getPassword()));
        patient.setPhone(patientDto.getPhone());
        patient.setRole(Role.valueOf("PATIENT"));
        Patient savedPatient = patientRepository.save(patient);
        return modelMapper.map(savedPatient,PatientDto.class);
    }

    @Override
    public PatientDto getPatientById(Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patients","id",id));
        return modelMapper.map(patient,PatientDto.class);
    }
    @Override
    public List<PatientDto> getPatientByName(String name) {
        List<Patient> patients = patientRepository.findByFirstname(name);
        List<PatientDto> patientDtoList = patients.stream()
                .map(patient -> modelMapper.map(patient,PatientDto.class))
                .collect(Collectors.toList());
        return patientDtoList;
    }
    @Override
    public List<PatientDto> getPatientByPhone(String phone) {
        List<Patient> patients = patientRepository.findByPhone(phone);
        List<PatientDto> patientDtoList = patients.stream()
                .map(patient -> modelMapper.map(patient,PatientDto.class))
                .collect(Collectors.toList());
        return patientDtoList;
    }
    @Override
    public PatientDto getPatientByEmail(String email) {
        Patient patient = patientRepository.findByEmail(email);
        return modelMapper.map(patient,PatientDto.class);
    }

    @Override
    public List<PatientDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDto> patientDtoList = patients.stream()
                .map(patient -> modelMapper.map(patient,PatientDto.class))
                .collect(Collectors.toList());
        return patientDtoList;
    }

    @Override
    public PatientDto updatePatient(PatientDto patientDto, Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patient","id",id));
        if (patientDto.getFirstname()!=null && patientDto.getFirstname()!=""){
            patient.setFirstname(patientDto.getFirstname());
        }
        if(patientDto.getLastname()!=null && patientDto.getLastname()!=""){
            patient.setLastname(patientDto.getLastname());
        }
        if (patientDto.getEmail()!=null && patientDto.getEmail()!=""){
            patient.setEmail(patientDto.getEmail());
        }
        if (patientDto.getPhone()!=null && patientDto.getPhone()!=""){
            patient.setPhone(patientDto.getPhone());
        }
        if (patientDto.getAge()!=0){
            patient.setAge(patientDto.getAge());
        }
        if (patient.getAddress()==null &&
                patientDto.getAddress().getPlace()!="" &&
                patientDto.getAddress().getCity()!="" &&
                patientDto.getAddress().getState()!="" &&
                patientDto.getAddress().getCountry()!=""
        ){
            Address address = new Address();
            if (patientDto.getAddress().getPlace()!=""){
                address.setPlace(patientDto.getAddress().getPlace());
            }
            if (patientDto.getAddress().getCity()!=""){
                address.setCity(patientDto.getAddress().getCity());
            }
            if (patientDto.getAddress().getState()!=""){
                address.setState(patientDto.getAddress().getState());
            }
            if (patientDto.getAddress().getCountry()!=""){
                address.setCountry(patientDto.getAddress().getCountry());
            }
            patient.setAddress(address);
        }else if (patientDto.getAddress()!=null){
            Address address = addressRepository.findById(patient.getAddress().getId())
                    .orElseThrow(()->new ResourceNotFoundException("Address","id",id));
            if (patientDto.getAddress().getPlace()!=""){
                address.setPlace(patientDto.getAddress().getPlace());
            }
            if (patientDto.getAddress().getCity()!=""){
                address.setCity(patientDto.getAddress().getCity());
            }
            if (patientDto.getAddress().getState()!=""){
                address.setState(patientDto.getAddress().getState());
            }
            if (patientDto.getAddress().getCountry()!=""){
                address.setCountry(patientDto.getAddress().getCountry());
            }
            patient.setAddress(address);
        }
        if (patientDto.getImage()!=null){
            patient.setImage(patientDto.getImage());
        }
        if (patientDto.getWeight()!=0.0){
            patient.setWeight(patientDto.getWeight());
        }
        if (patientDto.getHeight()!=0){
            patient.setHeight(patientDto.getHeight());
        }
        if (patientDto.getBloodGroup()!=null){
            patient.setBloodGroup(patientDto.getBloodGroup());
        }
        Patient savedPatient = patientRepository.save(patient);
        return modelMapper.map(savedPatient, PatientDto.class);
    }

    @Override
    public void deletePatient(Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patients","id",id));
        patientRepository.delete(patient);
    }
}

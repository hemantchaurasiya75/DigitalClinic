package com.digitalclinic.Digital.Clinic.services.implemantation;

import com.digitalclinic.Digital.Clinic.entities.Address;
import com.digitalclinic.Digital.Clinic.dtos.DoctorDto;
import com.digitalclinic.Digital.Clinic.entities.Clinic;
import com.digitalclinic.Digital.Clinic.entities.Doctor;
import com.digitalclinic.Digital.Clinic.exceptions.ResourceNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.AddressRepository;
import com.digitalclinic.Digital.Clinic.repositories.ClinicRepository;
import com.digitalclinic.Digital.Clinic.repositories.DoctorRepository;
import com.digitalclinic.Digital.Clinic.repositories.UserRepository;
import com.digitalclinic.Digital.Clinic.services.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public DoctorDto registerDoctor(Integer clinicId,DoctorDto doctorDto) {
        Doctor doctor = modelMapper.map(doctorDto,Doctor.class);
        doctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(()->new ResourceNotFoundException("Clinic","Id",clinicId));
        System.out.println("##############"+clinic.getName());
        if (clinic.getDoctors()!=null){
            List<Doctor> doctors= clinic.getDoctors();
            doctors.add(doctor);
            clinic.setDoctors(doctors);
        }else{
            List<Doctor> doctors = new ArrayList<>();
            doctors.add(doctor);
            clinic.setDoctors(doctors);
        }
//        Doctor savedDoctor = doctorRepository.save(doctor);
        clinicRepository.save(clinic);
        return modelMapper.map(doctor,DoctorDto.class);
    }

    @Override
    public DoctorDto updateDoctor(DoctorDto doctorDto, Integer id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Doctor","id",id));
        if (doctorDto.getFirstname()!=null && doctorDto.getFirstname()!=""){
            doctor.setFirstname(doctorDto.getFirstname());
        }
        if(doctorDto.getLastname()!=null && doctorDto.getFirstname()!=""){
            doctor.setLastname(doctorDto.getLastname());
        }
        if (doctorDto.getEmail()!=null && doctorDto.getEmail()!=""){
            doctor.setEmail(doctorDto.getEmail());
        }
        if (doctorDto.getPhone()!=null && doctorDto.getPhone()!=""){
            doctor.setPhone(doctorDto.getPhone());
        }
        if (doctorDto.getAge()!=0){
            doctor.setAge(doctorDto.getAge());
        }
        if (doctor.getAddress()==null){
            Address address = new Address();
            if (doctorDto.getAddress().getPlace()!=""){
                address.setPlace(doctorDto.getAddress().getPlace());
            }
            if (doctorDto.getAddress().getCity()!=""){
                address.setCity(doctorDto.getAddress().getCity());
            }
            if (doctorDto.getAddress().getState()!=""){
                address.setState(doctorDto.getAddress().getState());
            }
            if (doctorDto.getAddress().getCountry()!=""){
                address.setCountry(doctorDto.getAddress().getCountry());
            }
            doctor.setAddress(address);
        } else if (doctorDto.getAddress()!=null) {
            Address address = addressRepository.findById(doctor.getAddress().getId())
                    .orElseThrow(()->new ResourceNotFoundException("Address","id",id));
            if (doctorDto.getAddress().getPlace()!=""){
                address.setPlace(doctorDto.getAddress().getPlace());
            }
            if (doctorDto.getAddress().getCity()!=""){
                address.setCity(doctorDto.getAddress().getCity());
            }
            if (doctorDto.getAddress().getState()!=""){
                address.setState(doctorDto.getAddress().getState());
            }
            if (doctorDto.getAddress().getCountry()!=""){
                address.setCountry(doctorDto.getAddress().getCountry());
            }
            doctor.setAddress(address);
        }
        if (doctorDto.getImage()!=null){
            doctor.setImage(doctorDto.getImage());
        }
        if (doctorDto.getDepartment()!=null && doctorDto.getDepartment()!=""){
            doctor.setDepartment(doctorDto.getDepartment());
        }
        if (doctorDto.getSpecialist()!=null){
            doctor.setSpecialist(doctorDto.getSpecialist());
            System.out.println(doctor.getSpecialist());
        }
        if (doctorDto.getEducation()!=null){
            doctor.setEducation(doctorDto.getEducation());
        }
        Doctor savedDoctor = doctorRepository.save(doctor);
        return modelMapper.map(savedDoctor,DoctorDto.class);
    }

    @Override
    public DoctorDto getDoctorById(Integer id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Doctor","id",id));
        return modelMapper.map(doctor,DoctorDto.class);
    }

    @Override
    public List<DoctorDto> getDoctorByName(String name) {
        List<Doctor> doctors = doctorRepository.searchDoctorByName(name);
        List<DoctorDto> doctorDtoList = doctors.stream()
                .map(doctor -> modelMapper.map(doctor,DoctorDto.class))
                .collect(Collectors.toList());
        return doctorDtoList;
    }

    @Override
    public List<DoctorDto> getDoctorByPhone(String phone) {
        List<Doctor> doctors = doctorRepository.findByPhone(phone);
        List<DoctorDto> doctorDtoList = doctors.stream()
                .map(doctor -> modelMapper.map(doctor,DoctorDto.class))
                .collect(Collectors.toList());
        return doctorDtoList;
    }

    @Override
    public List<DoctorDto> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDto> doctorDtoList = doctors.stream()
                .map(doctor -> modelMapper.map(doctor,DoctorDto.class))
                .collect(Collectors.toList());
        return doctorDtoList;
    }

    @Override
    public void deleteDoctor(Integer id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Doctor","id",id));
        doctorRepository.delete(doctor);
    }
}

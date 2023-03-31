package com.digitalclinic.Digital.Clinic.services.implemantation;

import com.digitalclinic.Digital.Clinic.dtos.ClinicDto;
import com.digitalclinic.Digital.Clinic.entities.Address;
import com.digitalclinic.Digital.Clinic.entities.Clinic;
import com.digitalclinic.Digital.Clinic.entities.Doctor;
import com.digitalclinic.Digital.Clinic.exceptions.ResourceNotFoundException;
import com.digitalclinic.Digital.Clinic.repositories.AddressRepository;
import com.digitalclinic.Digital.Clinic.repositories.ClinicRepository;
import com.digitalclinic.Digital.Clinic.repositories.DoctorRepository;
import com.digitalclinic.Digital.Clinic.services.ClinicService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ClinicDto registerClinic(ClinicDto clinicDto) {
        Clinic clinic = modelMapper.map(clinicDto, Clinic.class);
        if (
                clinicDto.getName()!=null && clinicDto.getName()!="" &&
                clinicDto.getOpeningTime()!=null && clinicDto.getOpeningTime()!="" &&
                clinicDto.getClosingTime()!=null && clinicDto.getClosingTime()!="" &&
                clinicDto.getAddress()!=null
        ){
            Clinic savedClinic = clinicRepository.save(clinic);
            return modelMapper.map(savedClinic,ClinicDto.class);
        }
        return null;
    }

    @Override
    public ClinicDto searchClinicById(Integer id) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Clinic","Id",id));
        return modelMapper.map(clinic,ClinicDto.class);
    }

    @Override
    public List<ClinicDto> searchClinicByName(String name) {
        List<Clinic> clinicList = clinicRepository.findByNameContains(name);
        List<ClinicDto> clinicDtoList = clinicList.stream()
                .map(clinic -> modelMapper.map(clinic,ClinicDto.class)).collect(Collectors.toList());
        return clinicDtoList;
    }

    @Override
    public List<ClinicDto> searchAllClinics() {
        List<Clinic> clinicList = clinicRepository.findAll();
        List<ClinicDto> clinicDtoList = clinicList.stream()
                .map(clinic -> modelMapper.map(clinic,ClinicDto.class)).collect(Collectors.toList());
        return clinicDtoList;
    }

    @Override
    public List<ClinicDto> searchClinicBySpecialistDoctors(String specialist) {
//        List<Doctor> doctors = doctorRepository.findBySpecialist(specialist);
//        System.out.println(doctors);
        System.out.println(specialist);
        List<Clinic> clinics = clinicRepository.findByDoctors_specialist(specialist);

//        List<Clinic> clinics = new ArrayList<>();
//        for (Doctor doctor: doctors) {
//            Clinic clinic = clinicRepository.findByDoctors_userid(doctor.getUserid());
//            clinics.add(clinic);
//        }
        List<ClinicDto> clinicDtoList = clinics.stream()
                .map(clinic -> modelMapper.map(clinic,ClinicDto.class)).collect(Collectors.toList());
        return clinicDtoList;
    }

    @Override
    public List<ClinicDto> searchClinicByAddress(String address) {
//        List<Clinic> clinics = clinicRepository.findByAddress(address);
        return null;
    }

    @Override
    public ClinicDto updateClinic(ClinicDto clinicDto,Integer id) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Clinic","Id",id));
        if (clinicDto.getName()!=null && clinicDto.getName()!=""){
            clinic.setName(clinicDto.getName());
        }
        if (clinicDto.getOpeningTime()!=null && clinicDto.getOpeningTime()!=""){
            clinic.setOpeningTime(clinicDto.getOpeningTime());
        }
        if (clinicDto.getClosingTime()!=null && clinicDto.getClosingTime()!=""){
            clinic.setClosingTime(clinicDto.getClosingTime());
        }
        if (clinic.getAddress()==null){
            Address address = new Address();
            if (clinicDto.getAddress().getPlace()!=""){
                address.setPlace(clinicDto.getAddress().getPlace());
            }
            if (clinicDto.getAddress().getCity()!=""){
                address.setCity(clinicDto.getAddress().getCity());
            }
            if (clinicDto.getAddress().getState()!=""){
                address.setState(clinicDto.getAddress().getState());
            }
            if (clinicDto.getAddress().getCountry()!=""){
                address.setCountry(clinicDto.getAddress().getCountry());
            }
            clinic.setAddress(address);
        }
        else if (clinicDto.getAddress()!=null){
            Address address = addressRepository.findById(clinic.getAddress().getId())
                    .orElseThrow(()->new ResourceNotFoundException("Address","id",id));
            if (clinicDto.getAddress().getPlace()!=""){
                address.setPlace(clinicDto.getAddress().getPlace());
            }
            if (clinicDto.getAddress().getCity()!=""){
                address.setCity(clinicDto.getAddress().getCity());
            }
            if (clinicDto.getAddress().getState()!=""){
                address.setState(clinicDto.getAddress().getState());
            }
            if (clinicDto.getAddress().getCountry()!=""){
                address.setCountry(clinicDto.getAddress().getCountry());
            }
            clinic.setAddress(address);
        }
        Clinic updatedClinic = clinicRepository.save(clinic);
        return modelMapper.map(updatedClinic,ClinicDto.class);
    }

    @Override
    public void deleteClinic(Integer id) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Clinic","Id",id));
        clinicRepository.delete(clinic);
    }
}

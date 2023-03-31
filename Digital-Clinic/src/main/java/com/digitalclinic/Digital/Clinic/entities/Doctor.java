package com.digitalclinic.Digital.Clinic.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "doctors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Doctor extends User{
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id",referencedColumnName = "id")
    private Address address;
    private int age;
    private String image;
    private String department;
    @ElementCollection
    private List<String> specialist;
    private List<String> education;

    @ManyToMany(mappedBy = "doctors")
    private List<Clinic> clinic;
}

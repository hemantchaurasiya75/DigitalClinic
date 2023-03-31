package com.digitalclinic.Digital.Clinic.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Patient extends User{
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id",referencedColumnName = "id")
    private Address address;
    private int age;
    private String image;
    private float height;
    private float weight;
    private String bloodGroup;

    @OneToMany(mappedBy = "patient",cascade = CascadeType.ALL)
    private List<Medicine> medicines = new ArrayList<>();
}

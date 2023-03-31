package com.digitalclinic.Digital.Clinic.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "patient_id",referencedColumnName = "userid")
    private Patient patient;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "doctor_id",referencedColumnName = "userid")
    private Doctor doctor;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "medicine_id",referencedColumnName = "id")
    private Medicine medicine;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "clinic_id",referencedColumnName = "id")
    private Clinic clinic;
}

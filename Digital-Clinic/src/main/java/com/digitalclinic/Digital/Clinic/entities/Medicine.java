package com.digitalclinic.Digital.Clinic.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String disease;
    private String type;
    private String frequency;
    private String quantity;
    private String description;
    private Date date;

    @ManyToOne
    private Patient patient;
}

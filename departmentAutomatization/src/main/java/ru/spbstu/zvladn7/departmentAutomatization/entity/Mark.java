package ru.spbstu.zvladn7.departmentAutomatization.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "marks")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull(message = "Mark must have student id")
    @ManyToOne(targetEntity = Person.class)
    private long student;

    @NotNull(message = "Mark must have subject id")
    @ManyToOne(targetEntity = Subject.class)
    private long subject;

    @NotNull(message = "Mark must have teacher id")
    @ManyToOne(targetEntity = Person.class)
    private long teacher;

    @Column
    @NotNull(message = "Mark value may not be empty")
    private int value;

}

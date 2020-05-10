package ru.spbstu.zvladn7.departmentAutomatization.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 50)
    @NotBlank(message = "The name of subject may not be blank")
    @Size(min = 3, max = 50, message = "Subject name length must be between 3 and 50")
    private String name;

}

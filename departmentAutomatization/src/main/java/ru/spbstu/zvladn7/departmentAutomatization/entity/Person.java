package ru.spbstu.zvladn7.departmentAutomatization.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@NoArgsConstructor
@Table(name = "people")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 20)
    @NotBlank(message = "Person name may not be blank")
    @Size(max = 20, message = "Length of name may not be more than 20")
    private String first_name;

    @Column(length = 20)
    @NotBlank(message = "Person surname may not be blank")
    @Size(max = 20, message = "Length of surname may not be more than 20")
    private String last_name;

    @Column(length = 20)
    @NotBlank(message = "Person father name may not be blank")
    @Size(max = 20, message = "Length of father name may not be more than 20")
    private String father_name;

    @ManyToOne(targetEntity = Group.class)
    private Group group;

    @Column
    @NotNull(message = "Type of person may not be null")
    private char type;

    public Person(String first_name, String last_name, String father_name, Group group, char type) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.father_name = father_name;
        this.group = group;
        this.type = type;
    }
}

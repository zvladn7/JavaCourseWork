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
    private String firstname;

    @Column(length = 20)
    @NotBlank(message = "Person surname may not be blank")
    @Size(max = 20, message = "Length of surname may not be more than 20")
    private String lastname;

    @Column(length = 20)
    @NotBlank(message = "Person father name may not be blank")
    @Size(max = 20, message = "Length of father name may not be more than 20")
    private String fathername;

    @ManyToOne(targetEntity = Group.class)
    private Group group;

    @Column
    @NotNull(message = "Type of person may not be null")
    private char type;

    public Person(String firstname, String lastname, String fathername, Group group, char type) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fathername = fathername;
        this.group = group;
        this.type = type;
    }
}

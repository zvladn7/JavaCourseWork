package ru.spbstu.zvladn7.departmentAutomatization.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(length = 50)
    @NotBlank(message = "The name of group may not be blank")
    @Size(max = 50, message = "Group name length must not be more than 50")
    private String name;

}

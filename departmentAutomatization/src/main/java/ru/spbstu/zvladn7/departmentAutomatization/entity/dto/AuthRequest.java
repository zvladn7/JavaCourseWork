package ru.spbstu.zvladn7.departmentAutomatization.entity.dto;

import lombok.Data;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;

import java.io.Serializable;

@Data
public class AuthRequest implements Serializable {

    private String username;
    private String password;
    private boolean isStudent;
    private String first_name;
    private String last_name;
    private String father_name;
    private Group group;

}

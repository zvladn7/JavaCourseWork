package ru.spbstu.zvladn7.departmentAutomatization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.entity.User;
import ru.spbstu.zvladn7.departmentAutomatization.repository.PersonRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.UserRepository;

import java.util.Collections;

@Component
public class TestDataInit implements CommandLineRunner {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PersonRepository personRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepo.findByUsername("admin").isEmpty()) {

            Person person = new Person(
                    "Admin",
                    "Adminov",
                    "Adminvich",
                    null,
                    'A'
            );

            person = personRepo.save(person);


            userRepo.save(new User(
                    "admin",
                    passwordEncoder.encode("321"),
                    person,
                    Collections.singletonList("ROLE_ADMIN")
            ));
        }
    }
}

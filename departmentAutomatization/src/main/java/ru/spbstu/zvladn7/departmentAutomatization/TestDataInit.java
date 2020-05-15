package ru.spbstu.zvladn7.departmentAutomatization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.spbstu.zvladn7.departmentAutomatization.entity.User;
import ru.spbstu.zvladn7.departmentAutomatization.repository.UserRepository;

import java.util.Collections;

@Component
public class TestDataInit implements CommandLineRunner {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
//        userRepo.deleteAll();
//
//        userRepo.save(new User(
//                "zvladn7",
//                passwordEncoder.encode("123"),
//                Collections.singletonList("ROLE_STUDENT")
//        ));
//        userRepo.save(new User(
//                "zvladn",
//                passwordEncoder.encode("a123"),
//                Collections.singletonList("ROLE_TEACHER")
//        ));
    }
}

package ru.spbstu.zvladn7.departmentAutomatization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.entity.User;
import ru.spbstu.zvladn7.departmentAutomatization.entity.dto.AuthRequest;
import ru.spbstu.zvladn7.departmentAutomatization.repository.PersonRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.UserRepository;
import ru.spbstu.zvladn7.departmentAutomatization.security.jwt.JwtTokenProvider;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private static final String STUDENT = "ROLE_STUDENT";
    private static final String TEACHER = "ROLE_TEACHER";

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    PersonRepository personRepo;

    public Map<Object, Object> signIn(AuthRequest authRequest) {
        String username = authRequest.getUsername();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return null;
        }

        String token = jwtTokenProvider.createToken(
                username,
                user.getRoles()
        );

        Map<Object, Object>  map = new HashMap<>();
        map.put("userName", username);
        map.put("token", token);

        return map;
    }

    public boolean signUp(AuthRequest authRequest) {
        String username = authRequest.getUsername();
        Optional<User> user = userRepo.findByUsername(username);
        if (user.isPresent()) {
            return false;
        }

        User newUser = new User(
                username,
                passwordEncoder.encode(authRequest.getPassword()),
                Collections.singletonList(authRequest.isStudent() ? STUDENT : TEACHER)
        );

        userRepo.save(newUser);

        Person person = new Person(
                authRequest.getFirst_name(),
                authRequest.getLast_name(),
                authRequest.getFather_name(),
                authRequest.getGroup(),
                'S'
        );

        personRepo.save(person);

        return true;
    }
}

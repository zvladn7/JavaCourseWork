package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

@RestController
@RequestMapping("/api/auth")
public class AuthController {

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

    @PostMapping("/signin")
    public ResponseEntity<Map<Object, Object>> singIn(@RequestBody AuthRequest authRequest) {
        try {
            String username = authRequest.getUsername();
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

            if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            String token = jwtTokenProvider.createToken(
                    username,
                    user.getRoles()
            );

            Map<Object, Object>  map = new HashMap<>();
            map.put("userName", username);
            map.put("token", token);

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity singUp(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        Optional<User> user = userRepo.findByUsername(username);
        if (user.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
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

        return new ResponseEntity(HttpStatus.CREATED);
    }

}

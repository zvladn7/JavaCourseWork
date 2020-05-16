package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.entity.dto.AuthRequest;
import ru.spbstu.zvladn7.departmentAutomatization.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<Map<Object, Object>> singIn(@RequestBody AuthRequest authRequest) {
        try {
            Map<Object, Object> map = authService.signIn(authRequest);
            if (map == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthRequest> singUp(@RequestBody AuthRequest authRequest) {
        Person person = authService.signUp(authRequest);
        if (person == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(authRequest, HttpStatus.CREATED);
    }

}

package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.zvladn7.departmentAutomatization.entity.User;
import ru.spbstu.zvladn7.departmentAutomatization.entity.dto.AuthRequest;
import ru.spbstu.zvladn7.departmentAutomatization.repository.UserRepository;
import ru.spbstu.zvladn7.departmentAutomatization.security.jwt.JwtTokenProvider;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepo;

    @PostMapping("/signin")
    public ResponseEntity singIn(@RequestBody AuthRequest authRequest) {
        try {
            String username = authRequest.getUserName();
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

            if (!user.getPassword().equals(authRequest.getPassword())) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }

            String token = jwtTokenProvider.createToken(
                    username,
                    user.getRoles()
            );

            Map<Object, Object>  model = new HashMap<>();
            model.put("userName", username);
            model.put("token", token);

            return new ResponseEntity(HttpStatus.OK);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

}

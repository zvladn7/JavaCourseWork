package ru.spbstu.zvladn7.departmentAutomatization.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import ru.spbstu.zvladn7.departmentAutomatization.security.jwt.JwtSecurityConfigurer;
import ru.spbstu.zvladn7.departmentAutomatization.security.jwt.JwtTokenProvider;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/auth/signin").permitAll()
                .antMatchers("/api/auth/signup").permitAll()
                .antMatchers(HttpMethod.GET, "/api/groups").permitAll()
                .antMatchers(HttpMethod.POST, "/api/groups").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole("STUDENT", "TEACHER","ADMIN")
                .antMatchers(HttpMethod.POST, "/api/marks").hasRole("TEACHER")
                .antMatchers(HttpMethod.PUT, "/api/marks/{id}").hasRole("TEACHER")
                .antMatchers("/api/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));
    }


}

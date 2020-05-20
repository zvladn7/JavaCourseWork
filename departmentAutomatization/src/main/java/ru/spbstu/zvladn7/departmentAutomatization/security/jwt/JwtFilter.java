package ru.spbstu.zvladn7.departmentAutomatization.security.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import ru.spbstu.zvladn7.departmentAutomatization.exception.InvalidJwtAuthenticationException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;

    public JwtFilter(final JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        //check that we have token at http header
        try {
            String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
            if (token != null && !jwtTokenProvider.isTokenValid(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }

            chain.doFilter(request, response);
        } catch (InvalidJwtAuthenticationException ex) {
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

}

package ru.spbstu.zvladn7.departmentAutomatization.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.validationInMs}")
    private long validationInMs;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public long getValidationInMs() {
        return validationInMs;
    }

    public void setValidationInMs(long validationInMs) {
        this.validationInMs = validationInMs;
    }
}

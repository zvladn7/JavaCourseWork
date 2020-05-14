package ru.spbstu.zvladn7.departmentAutomatization.exception;

public class InvalidJwtAuthenticationException extends RuntimeException {

    public InvalidJwtAuthenticationException(String message) {
        super(message);
    }
}

package ru.spbstu.zvladn7.departmentAutomatization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class EntityOnDeleteByIdNotFoundException extends RuntimeException {

    public EntityOnDeleteByIdNotFoundException(long id) {
        super("Couldn't find an entity with id: " + id);
    }

}

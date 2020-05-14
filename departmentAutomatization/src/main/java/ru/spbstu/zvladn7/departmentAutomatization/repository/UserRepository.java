package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

}

package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;

public interface PersonRepository extends CrudRepository<Person, Long> {
}

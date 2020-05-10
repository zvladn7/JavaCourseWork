package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {

    Iterable<Person> findByGroup(Group group);
    Iterable<Person> findByType(char type);

}

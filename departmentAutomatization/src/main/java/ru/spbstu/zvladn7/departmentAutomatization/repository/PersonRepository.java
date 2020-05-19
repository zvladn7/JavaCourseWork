package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Iterable<Person> findByGroup(Group group);

    Iterable<Person> findAllByTypeOrderByLastnameAscFirstnameAscFathernameAsc(char type);

}

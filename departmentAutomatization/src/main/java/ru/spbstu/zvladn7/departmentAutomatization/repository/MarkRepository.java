package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Mark;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;

@Repository
public interface MarkRepository extends CrudRepository<Mark, Long> {

    Iterable<Mark> findByStudent(Person person);
    Iterable<Mark> findBySubject(Subject subject);
    Iterable<Mark> findByTeacher(Person person);

}

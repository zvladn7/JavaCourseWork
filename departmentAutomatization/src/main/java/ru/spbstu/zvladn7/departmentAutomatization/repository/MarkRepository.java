package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Mark;

@Repository
public interface MarkRepository extends CrudRepository<Mark, Long> {

    Iterable<Mark> findByStudent(long id);
    Iterable<Mark> findBySubject(long id);
    Iterable<Mark> findByTeacher(long id);

}

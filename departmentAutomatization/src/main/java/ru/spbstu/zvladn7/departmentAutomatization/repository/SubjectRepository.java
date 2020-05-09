package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Long> {
}

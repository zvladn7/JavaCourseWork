package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;

public interface SubjectRepository extends CrudRepository<Subject, Long> {
}

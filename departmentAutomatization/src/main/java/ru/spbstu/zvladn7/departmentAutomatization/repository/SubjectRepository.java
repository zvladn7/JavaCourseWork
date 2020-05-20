package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Iterable<Subject> findAllByOrderByNameAsc();

}

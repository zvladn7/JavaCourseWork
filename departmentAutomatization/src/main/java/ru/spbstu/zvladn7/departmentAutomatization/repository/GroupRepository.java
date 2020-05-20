package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Iterable<Group> findAllByOrderByNameAsc();


}

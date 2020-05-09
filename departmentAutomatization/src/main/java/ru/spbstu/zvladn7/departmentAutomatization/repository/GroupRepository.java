package ru.spbstu.zvladn7.departmentAutomatization.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;

public interface GroupRepository extends CrudRepository<Group, Long> {
}

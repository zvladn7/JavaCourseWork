package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.GroupRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupRepository groupRepo;

    @Autowired
    public GroupController(GroupRepository groupRepo) {
        this.groupRepo = groupRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Group>> getGroups() {
        return new ResponseEntity<>(groupRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable long id) {
        return groupRepo.findById(id).map(group -> new ResponseEntity<>(group, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Group> create(@Valid @RequestBody Group group) {
        return new ResponseEntity<>(groupRepo.save(group), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> update(
            @PathVariable long id,
            @Valid @RequestBody Group group
    ) {
        if (id != group.getId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(groupRepo.save(group), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        try {
            groupRepo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityByIdNotFoundException(id);
        }
    }

}

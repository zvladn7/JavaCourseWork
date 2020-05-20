package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Group;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.GroupRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.PersonRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupRepository groupRepo;
    private final PersonRepository personRepo;

    @Autowired
    public GroupController(
            GroupRepository groupRepo,
            PersonRepository personRepo
    ) {
        this.groupRepo = groupRepo;
        this.personRepo = personRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Group>> getGroups() {
        return new ResponseEntity<>(groupRepo.findAllByOrderByNameAsc(), HttpStatus.OK);
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
    public ResponseEntity delete(@PathVariable long id) {
        Group group = groupRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));
        Iterable<Person> people = personRepo.findByGroup(group);
        if (people.iterator().hasNext()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        try {
            groupRepo.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityByIdNotFoundException(id);
        }
    }

}

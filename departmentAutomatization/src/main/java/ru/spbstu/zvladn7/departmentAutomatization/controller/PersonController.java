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
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.GroupRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.PersonRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private static final char STUDENT_TYPE = 'S';
    private static final char TEACHER_TYPE = 'P';

    private final PersonRepository personRepo;
    private final GroupRepository groupRepo;

    @Autowired
    public PersonController(
            PersonRepository personRepo,
            GroupRepository groupRepo
    ) {
        this.personRepo = personRepo;
        this.groupRepo = groupRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Person>> getPeople() {
        return new ResponseEntity<>(personRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable long id) {
        return personRepo.findById(id).map(person -> new ResponseEntity<>(person, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/students")
    public ResponseEntity<Iterable<Person>> getStudents() {
        return new ResponseEntity<>(personRepo.findByType(STUDENT_TYPE), HttpStatus.OK);
    }

    @GetMapping("/teachers")
    public ResponseEntity<Iterable<Person>> getTeachers() {
        return new ResponseEntity<>(personRepo.findByType(TEACHER_TYPE), HttpStatus.OK);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<Iterable<Person>> getPersonsInGroup(@PathVariable long id) {
        Group group = groupRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));

        return new ResponseEntity<>(personRepo.findByGroup(group), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Person> create(@Valid @RequestBody Person person) {
        return new ResponseEntity<>(personRepo.save(person), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> update(
            @PathVariable long id,
            @Valid @RequestBody Person person
    ) {
        if (id != person.getId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(personRepo.save(person), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        try {
            personRepo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityByIdNotFoundException(id);
        }    }
}

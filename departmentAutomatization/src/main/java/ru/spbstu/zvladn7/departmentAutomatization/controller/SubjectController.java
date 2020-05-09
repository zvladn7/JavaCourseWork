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
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityOnDeleteByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.SubjectRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    private final SubjectRepository subjectRepo;

    @Autowired
    public SubjectController(SubjectRepository subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Subject>> getSubjects() {
        return new ResponseEntity<>(subjectRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable long id) {
        return subjectRepo.findById(id).map(subject -> new ResponseEntity<>(subject, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Subject> create(@Valid @RequestBody Subject subject) {
        return new ResponseEntity<>(subjectRepo.save(subject), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> update(
            @PathVariable long id,
            @Valid @RequestBody Subject subject
    ) {
        if (id != subject.getId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(subjectRepo.save(subject), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        try {
            subjectRepo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityOnDeleteByIdNotFoundException(id);
        }    }
}

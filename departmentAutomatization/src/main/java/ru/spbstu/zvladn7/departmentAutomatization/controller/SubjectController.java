package ru.spbstu.zvladn7.departmentAutomatization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Mark;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.MarkRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.SubjectRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectRepository subjectRepo;
    private final MarkRepository markRepo;

    @Autowired
    public SubjectController(
            SubjectRepository subjectRepo,
            MarkRepository markRepo
    ) {
        this.subjectRepo = subjectRepo;
        this.markRepo = markRepo;
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
    public ResponseEntity delete(@PathVariable long id) {
        Subject subject = subjectRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));
        Iterable<Mark> marks = markRepo.findBySubject(subject);
        if (marks.iterator().hasNext()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        try {
            subjectRepo.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityByIdNotFoundException(id);
        }
    }
}

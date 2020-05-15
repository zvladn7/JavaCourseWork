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
import ru.spbstu.zvladn7.departmentAutomatization.entity.Mark;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Person;
import ru.spbstu.zvladn7.departmentAutomatization.entity.Subject;
import ru.spbstu.zvladn7.departmentAutomatization.exception.EntityByIdNotFoundException;
import ru.spbstu.zvladn7.departmentAutomatization.repository.MarkRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.PersonRepository;
import ru.spbstu.zvladn7.departmentAutomatization.repository.SubjectRepository;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/marks")
public class MarkController {

    private static final char STUDENT_TYPE = 'S';
    private static final char TEACHER_TYPE = 'P';

    private final MarkRepository markRepo;
    private final PersonRepository personRepo;
    private final SubjectRepository subjectRepo;

    @Autowired
    public MarkController(
            MarkRepository markRepo,
            PersonRepository personRepo,
            SubjectRepository subjectRepo
    ) {
        this.markRepo = markRepo;
        this.personRepo = personRepo;
        this.subjectRepo = subjectRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Mark>> getMarks() {
        return new ResponseEntity<>(markRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mark> getMarkById(@PathVariable long id) {
        return markRepo.findById(id).map(mark -> new ResponseEntity<>(mark, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<Iterable<Mark>> getStudentMarks(@PathVariable long id) {
        Person student = personRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));
        if (student.getType() != STUDENT_TYPE) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(markRepo.findByStudent(student), HttpStatus.OK);
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<Iterable<Mark>> getTeacherMarks(@PathVariable long id) {
        Person teacher = personRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));
        if (teacher.getType() != TEACHER_TYPE) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(markRepo.findByTeacher(teacher), HttpStatus.OK);
    }

    @GetMapping("/subject/{id}")
    public ResponseEntity<Iterable<Mark>> getSubjectMarks(@PathVariable long id) {
        Subject subject = subjectRepo.findById(id).orElseThrow(() -> new EntityByIdNotFoundException(id));

        return new ResponseEntity<>(markRepo.findBySubject(subject), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Mark> create(@Valid @RequestBody Mark mark) {
        return new ResponseEntity<>(markRepo.save(mark), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mark> update(
            @PathVariable long id,
            @Valid @RequestBody Mark mark
    ) {
        if (id != mark.getId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(markRepo.save(mark), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        try {
            markRepo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
            throw new EntityByIdNotFoundException(id);
        }    }

}

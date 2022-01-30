package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    private AuthorService service;

    @Autowired
    public void setService(AuthorServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/")
    public List<Author> getAuthors() {
        List<Author> authorList = service.getAllAuthors();
        System.out.println(authorList);
        return authorList;
    }

    @GetMapping("/{id}")
    public void getOne(@PathVariable Long id) {
        Author author = service.getAuthor(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) {
        service.deleteAuthor(id);
    }

    @PostMapping()
    public void createAuthor(@RequestBody Author author) {
        service.saveAuthor(author);
    }

    @PatchMapping("/{id}")
    public void updateAuthor(@RequestBody Author author, @PathVariable Long id) {
        service.updateAuthor(author);
    }

}

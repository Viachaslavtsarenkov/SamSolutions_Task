package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.exception.NoSuchAuthorException;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import by.tsarenkov.service.security.SecurityContextService;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    private AuthorService service;
    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    public void setService(AuthorServiceImpl service) {
        this.service = service;
    }

    @GetMapping()
    public List<Author> getAuthors() {
        //System.out.println(((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
        List<Author> authorList = service.getAllAuthors();
        return authorList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) throws NoSuchAuthorException {
        Author author = null;
        author = service.getAuthor(id);
        return ResponseEntity.ok(author);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAuthor(@PathVariable Long id) {
        service.deleteAuthor(id);
        return ResponseEntity.ok("Author was deleted");
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createAuthor(@RequestPart("image") MultipartFile image,
                             @RequestPart("author") AuthorDto authorDto) {
        service.saveAuthor(authorDto, image);
        return ResponseEntity.ok(new MessageResponse("Author is created"));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateAuthor(@RequestPart("image") MultipartFile image,
                             @RequestPart("author")@RequestBody Author author) {
        service.updateAuthor(author, image);
        return ResponseEntity.ok(new MessageResponse("Author is updated"));
    }

}

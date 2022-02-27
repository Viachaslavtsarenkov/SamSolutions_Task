package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.exception.AuthorAlreadyExists;
import by.tsarenkov.service.exception.NoSuchAuthorException;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import by.tsarenkov.service.security.SecurityContextService;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping()
public class AuthorController {

    private static final String AUTHOR_BY_ID_MAPPING = "/authors/{id}";
    private static final String AUTHORS_MAPPING = "/authors";
    private static final String SEARCH_AUTHOR_MAPPING = "/authors/search";

    private AuthorService service;
    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    public void setService(AuthorServiceImpl service) {
        this.service = service;
    }

    @GetMapping(AUTHORS_MAPPING)
    public List<Author> getAuthors() {
       List<Author> authorList = service.getAllAuthors();
       return authorList;
    }

    @GetMapping(AUTHOR_BY_ID_MAPPING)
    public ResponseEntity<?> getOne(@PathVariable Long id) throws NoSuchAuthorException {
        Author author = null;
        author = service.getAuthor(id);
        return ResponseEntity.ok(author);
    }

    @DeleteMapping(AUTHOR_BY_ID_MAPPING)
    public ResponseEntity<?> deleteAuthor(@PathVariable Long id) {
        service.deleteAuthor(id);
        return ResponseEntity.ok("Author was deleted");
    }

    @PostMapping(value = AUTHORS_MAPPING, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createAuthor(@RequestPart(value = "image", required = false) MultipartFile image,
                             @RequestPart("author") AuthorDto authorDto)
    throws AuthorAlreadyExists {
        service.saveAuthor(authorDto, image);
        return ResponseEntity.ok(new MessageResponse("Author is created"));
    }

    @PostMapping(value = AUTHOR_BY_ID_MAPPING, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAuthor(@RequestPart(value = "image", required = false) MultipartFile image,
                             @RequestPart("author") Author author, @PathVariable Long id) {
        service.updateAuthor(author, image);
        return ResponseEntity.ok(new MessageResponse("Author is updated"));
    }

    @GetMapping(SEARCH_AUTHOR_MAPPING)
    public ResponseEntity<?> searchAuthor(@RequestParam("searchString") String searchString) {
        return ResponseEntity.ok().body(service.findAuthor(searchString));
    }

}

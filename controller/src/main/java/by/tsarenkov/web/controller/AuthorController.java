package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.payload.AuthorPageResponse;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.exception.AuthorNotFoundException;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import by.tsarenkov.service.security.SecurityContextService;
import by.tsarenkov.web.constant.Message;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping()
public class AuthorController {

    private static final String AUTHOR_BY_ID_MAPPING = "/authors/{id}";
    private static final String AUTHORS_MAPPING = "/authors";
    private static final String SEARCH_AUTHOR_MAPPING = "/authors/search";
    private static final String PSEUDONYM_SORT_FIELD = "pseudonym";

    private AuthorService service;
    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    public void setService(AuthorServiceImpl service) {
        this.service = service;
    }

    @GetMapping(value = AUTHORS_MAPPING)
    public ResponseEntity<?> getAuthors(@RequestParam(name = "page", required = false) Integer page,
                                        @RequestParam(name = "order", required = false) String order,
                                        @RequestParam(name = "size", required = false) Integer size) {
        List<Sort.Order> sorts= new ArrayList<>();
        if(order == null || order.equals("ASC")) {
            sorts.add(new Sort.Order(Sort.Direction.ASC,PSEUDONYM_SORT_FIELD));
        } else {
            sorts.add(new Sort.Order(Sort.Direction.DESC,PSEUDONYM_SORT_FIELD));
        }
        AuthorPageResponse authors = service.getAllAuthors(page, Sort.by(sorts));
       return ResponseEntity.ok().body(authors);
    }

    @GetMapping(AUTHOR_BY_ID_MAPPING)
    public ResponseEntity<?> getOne(@PathVariable Long id) throws AuthorNotFoundException {
        Author author = null;
        author = service.getAuthor(id);
        System.out.println(author);
        return ResponseEntity.ok(author);
    }

    @DeleteMapping(AUTHOR_BY_ID_MAPPING)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAuthor(@PathVariable Long id) {
        service.deleteAuthor(id);
        return ResponseEntity.ok("Author was deleted");
    }

    @PostMapping(value = AUTHORS_MAPPING, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createAuthor(@RequestPart(value = "image", required = false) MultipartFile image,
                             @RequestPart("author") AuthorDto authorDto) {
        try {
            Author author = Author.builder()
                    .pseudonym(authorDto.getPseudonym())
                    .description(authorDto.getDescription())
                    .build();
            service.saveAuthor(author, image);
        } catch (AuthorAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(new MessageResponse(Message.AUTHOR_CREATED));
    }

    @PostMapping(value = AUTHOR_BY_ID_MAPPING, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAuthor(@RequestPart(value = "image", required = false) MultipartFile image,
                             @RequestPart("author") Author author, @PathVariable Long id) {
        try {
            service.updateAuthor(author, image);
        } catch (AuthorAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(new MessageResponse(Message.AUTHOR_UPDATED));
    }

    @GetMapping(SEARCH_AUTHOR_MAPPING)
    public ResponseEntity<?> searchAuthor(@RequestParam("searchString") String searchString) {
        return ResponseEntity.ok().body(service.findAuthor(searchString));
    }

}

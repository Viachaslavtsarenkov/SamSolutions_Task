package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class AuthorController {


    private AuthorService service;

    @Autowired
    public void setService(AuthorServiceImpl service) {
        this.service = service;
    }

    @RequestMapping("/store/authors")
    public ModelAndView getAuthors() {
        service.saveAuthor(Author.builder().name("geirby").build());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

}

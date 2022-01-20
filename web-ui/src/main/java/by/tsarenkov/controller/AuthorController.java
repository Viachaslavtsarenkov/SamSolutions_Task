package by.tsarenkov.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class AuthorController {
    @GetMapping("/store/authors")
    public ModelAndView getAuthors() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("authors/author");
        return modelAndView;
    }
    @GetMapping("/new")
    public String addAuthor() {
        return "authors";
    }

    @PostMapping("/")
    public String createAuthor() {
        return "/author/";
    }
}

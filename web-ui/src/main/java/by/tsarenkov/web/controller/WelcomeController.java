package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class WelcomeController {

    @RequestMapping(value={"/"})
    public ModelAndView index () {
        System.out.println("sdfsdfsffdsdsfsdsdf");
        //service.saveAuthor(Author.builder().name("geirby").build());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

}
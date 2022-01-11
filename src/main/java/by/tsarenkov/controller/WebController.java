package by.tsarenkov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class WebController {

    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {
        System.out.println("sdfsdf");
        model.addAttribute("message", "Spring 3 MVC - Hello World");
        return "main";
    }
}

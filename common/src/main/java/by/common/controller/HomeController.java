package by.common.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import by.service.Service;

public class HomeController {
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}

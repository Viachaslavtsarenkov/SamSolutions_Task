package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.UserDto;
import by.tsarenkov.common.model.entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/{id}")
    public void getUser(@PathVariable Long id) {

    }

    @PatchMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {

    }

    @PostMapping
    public void createUser(@RequestBody UserDto user) {

    }

    @GetMapping("/")
    public void getAllUsers() {
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

    }

}

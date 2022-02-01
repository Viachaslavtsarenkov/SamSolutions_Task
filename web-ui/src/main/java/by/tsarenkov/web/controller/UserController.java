package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.impl.UserServiceImpl;
import by.tsarenkov.service.validator.UserServiceValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private Validator userValidator;

    @Autowired
    public void setUserValidator(UserServiceValidator userValidator) {
        this.userValidator = userValidator;
    }

    @Autowired
    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public void getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
    }

    @PatchMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createUser(@RequestBody User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);
        System.out.println(bindingResult);
        //userService.registerUser(user);
        return ResponseEntity.ok(user);

    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}

package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public void getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(user);
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}

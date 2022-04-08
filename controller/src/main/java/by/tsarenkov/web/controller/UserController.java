package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private static final String USER_BY_ID_MAPPING = "/users/{id}";
    private static final String USER_MAPPING = "/users";

    private final UserService userService;

    @GetMapping(USER_BY_ID_MAPPING)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id)
            throws UserNotFoundException {
        User user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping(USER_MAPPING)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(@RequestParam(value = "page", required = false,
            defaultValue = "0") Integer page,
                                         @RequestParam(value = "size", required = false,
                                                 defaultValue = "10") Integer size) {
        return ResponseEntity.ok(userService.findAllUsers(page, size));
    }

}

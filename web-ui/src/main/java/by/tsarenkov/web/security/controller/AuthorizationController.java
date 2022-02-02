package by.tsarenkov.web.security.controller;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.dto.LogInDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.validator.UserDataValidator;
import by.tsarenkov.web.controller.response.MessageResponse;
import by.tsarenkov.web.controller.response.UserAuthenticationResponse;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
public class AuthorizationController {

    private static final String POST_LOGIN_MAPPING = "/login";
    private static final String POST_SIGN_IN_MAPPING = "/signIn";
    private static final String EMAIL_CLAIM = "email";
    private static final String ROLE_CLAIM = "role";
    private static final String NAME_CLAIM = "name";
    private static final String SECRET_KEY = "secret";

    @Autowired
    private UserService userService;
    @Autowired
    private UserDataValidator userValidator;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping(POST_SIGN_IN_MAPPING)
    public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        userValidator.validate(user, result);
        if(result.hasErrors()) {
            for(FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getCode());
            }
            return ResponseEntity.badRequest().body(errors);
        }
        //todo check email

        System.out.println(userService.registerUser(user));
        return ResponseEntity.ok(new MessageResponse("Registration is done"));
    }

    @PostMapping(POST_LOGIN_MAPPING)
    public ResponseEntity<?> authenticate(@RequestBody LogInDto userDto) {
        Authentication authentication;
        System.out.println(userDto.getLogin() + userDto.getPassword());
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getLogin(),
                           userDto.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("error"));
        }

        System.out.println("before ______________________________________________________");
        UserDetailsImpl authenticatedUser = (UserDetailsImpl) authentication.getPrincipal();
        String accessToken = JWT.create()
                .withSubject(authenticatedUser.getEmail())
                .withExpiresAt(new Date(Long.MAX_VALUE))
                .withIssuer(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .withClaim(EMAIL_CLAIM, authenticatedUser.getEmail())
                .withClaim(ROLE_CLAIM, authenticatedUser
                        .getAuthorities()
                        .stream()
                        .map(SimpleGrantedAuthority::getAuthority).collect(Collectors.toList()))
                .withClaim(NAME_CLAIM, authenticatedUser.getUsername())
                .sign(Algorithm.HMAC256(SECRET_KEY));
        System.out.println("______________________________________________________");
        return ResponseEntity.ok(new UserAuthenticationResponse(accessToken));
    }
}

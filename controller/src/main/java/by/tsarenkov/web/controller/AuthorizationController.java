package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.dto.LogInDto;
import by.tsarenkov.common.model.dto.UserDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.validator.UserDataValidator;
import by.tsarenkov.web.constant.Message;
import by.tsarenkov.web.controller.response.MessageResponse;
import by.tsarenkov.web.controller.response.UserAuthenticationResponse;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
public class AuthorizationController {

    private static final String POST_LOGIN_MAPPING = "/login";
    private static final String POST_SIGN_IN_MAPPING = "/signUp";
    private static final String POST_ACTIVATION_MAPPING = "/activation";
    private static final String EMAIL_CLAIM = "email";
    private static final String ROLE_CLAIM = "role";
    private static final String NAME_CLAIM = "name";
    private static final String SECRET_KEY = "secret";

    private final UserService userService;
    private final UserDataValidator userValidator;
    private final AuthenticationManager authenticationManager;

    @PostMapping(value = POST_SIGN_IN_MAPPING, consumes = {"application/json"})
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto, BindingResult result)
            throws EmailAlreadyTakenException {
        Map<String, String> errors = new HashMap<>();
        userValidator.validate(userDto, result);

        if(result.hasErrors()) {
            for(FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getCode());

            }
            return ResponseEntity.badRequest().body(errors);
        }
        User user = User.builder()
                .name(userDto.getName())
                .surname(userDto.getSurname())
                .password(userDto.getPassword())
                .patronymic(userDto.getPatronymic())
                .phoneNumber(userDto.getPhoneNumber())
                .email(userDto.getEmail())
                .build();
        userService.registerUser(user);

        return ResponseEntity.ok(new MessageResponse("Registration is done"));
    }

    @PostMapping(POST_LOGIN_MAPPING)
    public ResponseEntity<?> authenticate(@RequestBody LogInDto userDto) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getLogin(),
                           userDto.getPassword()));
            } catch (AccountStatusException e) {
                return ResponseEntity.badRequest().body(new MessageResponse(Message.ACCOUNT_IS_NOT_ACTIVATED));
            } catch (AuthenticationException e) {
                return ResponseEntity.badRequest().body(new MessageResponse(Message.BAD_CREDENTIAL));
            }
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
        return ResponseEntity.ok(new UserAuthenticationResponse(accessToken));
    }

    @PostMapping(POST_ACTIVATION_MAPPING)
    public ResponseEntity<?> activateAccount(@RequestBody ActivationDto activationDto)
            throws ActivationAccountException {
        userService.activateAccount(activationDto);
        return ResponseEntity.ok(new by.tsarenkov.web.controller.response.MessageResponse("The account is activated"));
    }

    @GetMapping("/logout")
    public void logout() {
        SecurityContextHolder.clearContext();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null) {
            authentication.setAuthenticated(false);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}
